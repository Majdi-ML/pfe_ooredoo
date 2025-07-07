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
    isAuthenticated: (state) => !!state.user && !!state.token,
    isAdmin: (state) => state.user?.role_id === 2,
    isDemandeur: (state) => state.user?.role_id === 1,
    currentUser: (state) => state.user
  },

  actions: {
    async login(credentials: LoginCredentials) {
      this.loading = true
      this.error = null
      console.log('Attempting login with:', credentials)

      try {
        await apiClient.get('/sanctum/csrf-cookie')
        const response = await apiClient.post<AuthResponse>('/api/login', credentials)
        console.log('Login response:', response.data)

        this.user = response.data.user
        this.token = response.data.token
        localStorage.setItem('auth_token', this.token)
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        this.authChecked = true
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Login failed')
        throw error
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
      if (this.authChecked && this.user) return
      if (!this.token) {
        console.log('No token found, skipping auth check')
        return
      }
      this.loading = true
      console.log('Checking auth with token:', this.token)

      try {
        await apiClient.get('/sanctum/csrf-cookie')
        const response = await apiClient.get<User>('/api/user', {
          headers: this.getAuthHeader()
        })
        console.log('Check auth response:', response.data)

        this.user = response.data
        this.authChecked = true
        return this.user
      } catch (error: any) {
        console.error('Check auth failed:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data
        })
        this.clearAuth()
        throw error
      } finally {
        this.loading = false
      }
    },

    getAuthHeader() {
      return {
        Authorization: `Bearer ${this.token}`,
        'X-XSRF-TOKEN': document.cookie.match('XSRF-TOKEN=([^;]+)')?.[1] || ''
      }
    },

    clearAuth() {
      this.user = null
      this.token = null
      this.authChecked = false
      delete apiClient.defaults.headers.common['Authorization']
      localStorage.removeItem('auth_token')
      console.log('Authentication cleared')
    },

    handleError(error: any, context: string) {
      this.error = error.response?.data?.message || error.message
      console.error(`${context}:`, error)
    },

    initialize() {
      console.log('Initializing user store, token:', this.token)
      if (this.token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        this.checkAuth().catch(() => {
          console.log('Auth check failed during initialization')
          this.clearAuth()
        })
      }
    }
  }
})