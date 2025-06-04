import { defineStore } from 'pinia'
import axios from 'axios'
import type { RequeteSQL, RequeteSQLCreatePayload } from '@/interfaces/RequeteSQL'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const useRequeteSqlStore = defineStore('requeteSql', {
  state: () => ({
    requetes: [] as RequeteSQL[],
    currentRequete: null as RequeteSQL | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchRequetes() {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.get('/requetessqls', {
          params: { include: 'etat,demande,serveurs' }
        })
        this.requetes = response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching SQL queries')
      } finally {
        this.loading = false
      }
    },

    async fetchRequeteById(id: number) {
      this.loading = true
      try {
        const response = await apiClient.get(`/requetessqls/${id}`, {
          params: { include: 'etat,demande,serveurs' }
        })
        this.currentRequete = response.data
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching query details')
        throw error
      } finally {
        this.loading = false
      }
    },

    async createRequete(payload: RequeteSQLCreatePayload) {
      this.loading = true
      try {
        const response = await apiClient.post('/requetessqls', payload)
        this.requetes.unshift(response.data)
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error creating query')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateRequete(requete: RequeteSQL) {
      this.loading = true
      try {
        const { id, ...payload } = requete
        const response = await apiClient.put(`/requetessqls/${id}`, payload)
        
        const index = this.requetes.findIndex(r => r.id === id)
        if (index !== -1) {
          this.requetes[index] = response.data
        }
        
        if (this.currentRequete?.id === id) {
          this.currentRequete = response.data
        }
        
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error updating query')
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteRequete(id: number) {
      this.loading = true
      try {
        await apiClient.delete(`/requetessqls/${id}`)
        this.requetes = this.requetes.filter(r => r.id !== id)
        
        if (this.currentRequete?.id === id) {
          this.currentRequete = null
        }
      } catch (error: any) {
        this.handleError(error, 'Error deleting query')
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
    getRequeteById: (state) => (id: number) => {
      return state.requetes.find(r => r.id === id)
    },
    
    requetesByDemande: (state) => (demandeId: number) => {
      return state.requetes.filter(r => r.demande_id === demandeId)
    },
    
    totalRequetes: (state) => state.requetes.length
  }
})