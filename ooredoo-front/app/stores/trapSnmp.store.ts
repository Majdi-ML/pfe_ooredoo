import { defineStore } from 'pinia'
import axios from 'axios'
import type { TrapSnmp, TrapSnmpCreatePayload } from '@/interfaces/TrapSnmp'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const useTrapSnmpStore = defineStore('trapSnmp', {
  state: () => ({
    traps: [] as TrapSnmp[],
    currentTrap: null as TrapSnmp | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchTraps() {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.get('/trapssnmps', {
          params: { include: 'etat,demande,serveurs' }
        })
        this.traps = response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching SNMP traps')
      } finally {
        this.loading = false
      }
    },

    async fetchTrapById(id: number) {
      this.loading = true
      try {
        const response = await apiClient.get(`/trapssnmps/${id}`, {
          params: { include: 'etat,demande,serveurs' }
        })
        this.currentTrap = response.data
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching trap details')
        throw error
      } finally {
        this.loading = false
      }
    },

    async createTrap(payload: TrapSnmpCreatePayload) {
      this.loading = true
      try {
        const response = await apiClient.post('/trapssnmps', payload)
        this.traps.unshift(response.data)
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error creating trap')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateTrap(trap: TrapSnmp) {
      this.loading = true
      try {
        const { id, ...payload } = trap
        const response = await apiClient.put(`/trapssnmps/${id}`, payload)
        
        const index = this.traps.findIndex(t => t.id === id)
        if (index !== -1) {
          this.traps[index] = response.data
        }
        
        if (this.currentTrap?.id === id) {
          this.currentTrap = response.data
        }
        
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error updating trap')
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteTrap(id: number) {
      this.loading = true
      try {
        await apiClient.delete(`/trapssnmps/${id}`)
        this.traps = this.traps.filter(t => t.id !== id)
        
        if (this.currentTrap?.id === id) {
          this.currentTrap = null
        }
      } catch (error: any) {
        this.handleError(error, 'Error deleting trap')
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
    getTrapById: (state) => (id: number) => {
      return state.traps.find(t => t.id === id)
    },
    
    trapsByDemande: (state) => (demandeId: number) => {
      return state.traps.filter(t => t.demande_id === demandeId)
    },
    
    totalTraps: (state) => state.traps.length
  }
})