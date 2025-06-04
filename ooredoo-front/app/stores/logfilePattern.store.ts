import { defineStore } from 'pinia'
import axios from 'axios'
import type { LogfilePattern, LogfilePatternCreatePayload } from '@/interfaces/LogfilePattern'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const useLogfilePatternStore = defineStore('logfilePattern', {
  state: () => ({
    patterns: [] as LogfilePattern[],
    currentPattern: null as LogfilePattern | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchPatterns() {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.get('/logfilespatterns', {
          params: { include: 'etat,criticite,logfile,demande' }
        })
        this.patterns = response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching logfile patterns')
      } finally {
        this.loading = false
      }
    },

    async fetchPatternById(id: number) {
      this.loading = true
      try {
        const response = await apiClient.get(`/logfilespatterns/${id}`, {
          params: { include: 'etat,criticite,logfile,demande' }
        })
        this.currentPattern = response.data
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching pattern details')
        throw error
      } finally {
        this.loading = false
      }
    },

    async createPattern(payload: LogfilePatternCreatePayload) {
      this.loading = true
      try {
        const response = await apiClient.post('/logfilespatterns', payload)
        this.patterns.unshift(response.data)
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error creating pattern')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updatePattern(pattern: LogfilePattern) {
      this.loading = true
      try {
        const { id, ...payload } = pattern
        const response = await apiClient.put(`/logfilespatterns/${id}`, payload)
        
        const index = this.patterns.findIndex(p => p.id === id)
        if (index !== -1) {
          this.patterns[index] = response.data
        }
        
        if (this.currentPattern?.id === id) {
          this.currentPattern = response.data
        }
        
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error updating pattern')
        throw error
      } finally {
        this.loading = false
      }
    },

    async deletePattern(id: number) {
      this.loading = true
      try {
        await apiClient.delete(`/logfilespatterns/${id}`)
        this.patterns = this.patterns.filter(p => p.id !== id)
        
        if (this.currentPattern?.id === id) {
          this.currentPattern = null
        }
      } catch (error: any) {
        this.handleError(error, 'Error deleting pattern')
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
    getPatternById: (state) => (id: number) => {
      return state.patterns.find(p => p.id === id)
    },
    
    patternsByLogfile: (state) => (logfileId: number) => {
      return state.patterns.filter(p => p.logfile_id === logfileId)
    },
    
    patternsByDemande: (state) => (demandeId: number) => {
      return state.patterns.filter(p => p.demande_id === demandeId)
    },
    
    totalPatterns: (state) => state.patterns.length
  }
})