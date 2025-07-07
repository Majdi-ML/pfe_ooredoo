import { defineStore } from 'pinia'
import axios from 'axios'
import type { TrapSnmp, TrapSnmpCreatePayload } from '@/interfaces/TrapSnmp'

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
        const response = await apiClient.get('/trapssnmp', { // Changed from /trapssnmps to /trapssnmp
          params: { include: 'etat,versionsnmp,criticite,demande,serveurs' } // Updated include to match controller
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
        const response = await apiClient.get(`/trapssnmp/${id}`, { // Changed from /trapssnmps to /trapssnmp
          params: { include: 'etat,versionsnmp,criticite,demande,serveurs' }
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
        const response = await apiClient.post('/trapssnmp', payload) // Changed from /trapssnmps to /trapssnmp
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
        const response = await apiClient.put(`/trapssnmp/${id}`, payload) // Changed from /trapssnmps to /trapssnmp
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
        await apiClient.delete(`/trapssnmp/${id}`) // Changed from /trapssnmps to /trapssnmp
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