import { defineStore } from 'pinia'
import axios from 'axios'
import type { AuthResponse, LoginCredentials, LogoutResponse, User } from '@/interfaces/User'
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export const useUserStore = defineStore('user', {
  state: () => ({
  user: null as User | null,
  token: typeof window !== 'undefined' ? localStorage.getItem('auth_token') as string | null : null,
  loading: false,
  error: null as string | null,
  authChecked: false
}),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role_id === 2,
    isDemandeur: (state) => state.user?.role_id === 1,
    currentUser: (state) => state.user
  },

  actions: {
    async login(credentials: LoginCredentials) {
      this.loading = true
      this.error = null

      try {
        await apiClient.get('/sanctum/csrf-cookie')

        const response = await apiClient.post<AuthResponse>('/api/login', credentials)

        this.user = response.data.user
        this.token = response.data.token
        localStorage.setItem('auth_token', this.token)
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        return response.data
      } catch (error: any) {
        this.handleError(error, 'Login failed')

        if (error.response?.status === 401) {
          throw new Error('Invalid LDAP credentials')
        } else if (error.response?.status === 404) {
          throw new Error('LDAP user not found')
        } else {
          throw new Error('LDAP authentication error')
        }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      this.loading = true
      try {
        await apiClient.post<LogoutResponse>('/api/logout', {}, {
          headers: this.getAuthHeader()
        })
        this.clearAuth()
      } catch (error) {
        this.handleError(error, 'Logout failed')
        throw error
      } finally {
        this.loading = false
      }
    },

    async checkAuth() {
      if (this.authChecked) return
      this.loading = true

      try {
        const response = await apiClient.get<User>('/api/user', {
          headers: this.getAuthHeader()
        })

        this.user = response.data
        this.authChecked = true
        return this.user
      } catch (error) {
        this.clearAuth()
        throw error
      } finally {
        this.loading = false
      }
    },

    getAuthHeader() {
      return {
        Authorization: `Bearer ${this.token}`
      }
    },

    clearAuth() {
      this.user = null
      this.token = null
      this.authChecked = false
      delete apiClient.defaults.headers.common['Authorization']
      localStorage.removeItem('auth_token')
    },

    handleError(error: any, context: string) {
      this.error = error.response?.data?.message || error.message
      console.error(`${context}:`, error)
    },

    initialize() {
      if (this.token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        this.checkAuth().catch(() => this.clearAuth())
      }
    }
  }
}
)
// Call the initialize method when the store is created 
//useUserStore().initialize()
