import { defineStore } from 'pinia'
import axios from 'axios'
import type { Logfile, LogfileCreatePayload } from '@/interfaces/Logfile'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const useLogfileStore = defineStore('logfile', {
  state: () => ({
    logfiles: [] as Logfile[],
    currentLogfile: null as Logfile | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchLogfiles() {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.get('/logfiles', {
          params: { include: 'etat,monitoredby,demande,serveurs,logfilespatterns' }
        })
        this.logfiles = response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching logfiles')
      } finally {
        this.loading = false
      }
    },

    async fetchLogfileById(id: number) {
      this.loading = true
      try {
        const response = await apiClient.get(`/logfiles/${id}`, {
          params: { include: 'etat,monitoredby,demande,serveurs,logfilespatterns' }
        })
        this.currentLogfile = response.data
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching logfile details')
        throw error
      } finally {
        this.loading = false
      }
    },

    async createLogfile(payload: LogfileCreatePayload) {
      this.loading = true
      try {
        const response = await apiClient.post('/logfiles', payload)
        this.logfiles.unshift(response.data)
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error creating logfile')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateLogfile(logfile: Logfile) {
      this.loading = true
      try {
        const { id, ...payload } = logfile
        const response = await apiClient.put(`/logfiles/${id}`, payload)
        
        const index = this.logfiles.findIndex(l => l.id === id)
        if (index !== -1) {
          this.logfiles[index] = response.data
        }
        
        if (this.currentLogfile?.id === id) {
          this.currentLogfile = response.data
        }
        
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error updating logfile')
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteLogfile(id: number) {
      this.loading = true
      try {
        await apiClient.delete(`/logfiles/${id}`)
        this.logfiles = this.logfiles.filter(l => l.id !== id)
        
        if (this.currentLogfile?.id === id) {
          this.currentLogfile = null
        }
      } catch (error: any) {
        this.handleError(error, 'Error deleting logfile')
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
    getLogfileById: (state) => (id: number) => {
      return state.logfiles.find(l => l.id === id)
    },
    
    logfilesByDemande: (state) => (demandeId: number) => {
      return state.logfiles.filter(l => l.demande_id === demandeId)
    },
    
    totalLogfiles: (state) => state.logfiles.length
  }
})