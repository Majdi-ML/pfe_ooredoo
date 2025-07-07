import { defineStore } from 'pinia'
import axios from 'axios'
import type { Process, ProcessCreatePayload } from '@/interfaces/Process'

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

export const useProcessStore = defineStore('process', {
  state: () => ({
    processes: [] as Process[],
    currentProcess: null as Process | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchProcesses() {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.get('/processes', {
          params: { include: 'etat,demande,serveurs' }
        })
        this.processes = response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching processes')
      } finally {
        this.loading = false
      }
    },

    async fetchProcessById(id: number) {
      this.loading = true
      try {
        const response = await apiClient.get(`/processes/${id}`, {
          params: { include: 'etat,demande,serveurs' }
        })
        this.currentProcess = response.data
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching process details')
        throw error
      } finally {
        this.loading = false
      }
    },

    async createProcess(payload: ProcessCreatePayload) {
      this.loading = true
      try {
        const response = await apiClient.post('/processes', payload)
        this.processes.unshift(response.data)
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error creating process')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateProcess(process: Process) {
      this.loading = true
      try {
        const { id, ...payload } = process
        const response = await apiClient.put(`/processes/${id}`, payload)
        
        const index = this.processes.findIndex(p => p.id === id)
        if (index !== -1) {
          this.processes[index] = response.data
        }
        
        if (this.currentProcess?.id === id) {
          this.currentProcess = response.data
        }
        
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error updating process')
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteProcess(id: number) {
      this.loading = true
      try {
        await apiClient.delete(`/processes/${id}`)
        this.processes = this.processes.filter(p => p.id !== id)
        
        if (this.currentProcess?.id === id) {
          this.currentProcess = null
        }
      } catch (error: any) {
        this.handleError(error, 'Error deleting process')
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
    getProcessById: (state) => (id: number) => {
      return state.processes.find(p => p.id === id)
    },
    
    processesByDemande: (state) => (demandeId: number) => {
      return state.processes.filter(p => p.demande_id === demandeId)
    },
    
    totalProcesses: (state) => state.processes.length
  }
})