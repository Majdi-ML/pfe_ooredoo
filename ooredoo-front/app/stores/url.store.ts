
import axios from 'axios'
import type { Url, UrlCreatePayload } from '@/interfaces/Url'

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const useUrlStore = defineStore('url', {
  state: () => ({
    urls: [] as Url[],
    currentUrl: null as Url | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchUrls() {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.get('/urls', {
          params: { include: 'etat,criticite,monitoredby,demande,serveurs' }
        })
        this.urls = response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching URLs')
      } finally {
        this.loading = false
      }
    },

    async fetchUrlById(id: number) {
      this.loading = true
      try {
        const response = await apiClient.get(`/urls/${id}`, {
          params: { include: 'etat,criticite,monitoredby,demande,serveurs' }
        })
        this.currentUrl = response.data
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching URL details')
        throw error
      } finally {
        this.loading = false
      }
    },

    async createUrl(payload: UrlCreatePayload) {
      this.loading = true
      try {
        const response = await apiClient.post('/urls', payload)
        this.urls.unshift(response.data)
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error creating URL')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateUrl(url: Url) {
      this.loading = true
      try {
        const { id, ...payload } = url
        const response = await apiClient.put(`/urls/${id}`, payload)
        const index = this.urls.findIndex(u => u.id === id)
        if (index !== -1) {
          this.urls[index] = response.data
        }
        if (this.currentUrl?.id === id) {
          this.currentUrl = response.data
        }
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error updating URL')
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteUrl(id: number) {
      this.loading = true
      try {
        await apiClient.delete(`/urls/${id}`)
        this.urls = this.urls.filter(u => u.id !== id)
        if (this.currentUrl?.id === id) {
          this.currentUrl = null
        }
      } catch (error: any) {
        this.handleError(error, 'Error deleting URL')
        throw error
      } finally {
        this.loading = false
      }
    },

    handleError(error: any, context: string) {
      this.error = error.response?.data?.message || error.message
      console.error(`${context}:`, error)
      return this.error
    }
  },

  getters: {
    getUrlById: (state) => (id: number) => {
      return state.urls.find(u => u.id === id)
    },
    urlsByDemande: (state) => (demandeId: number) => {
      return state.urls.filter(u => u.demande_id === demandeId)
    },
    totalUrls: (state) => state.urls.length
  }
})