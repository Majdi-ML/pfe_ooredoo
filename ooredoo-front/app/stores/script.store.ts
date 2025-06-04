import { defineStore } from 'pinia'
import axios from 'axios'
import type { Script, ScriptCreatePayload } from '@/interfaces/Script'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const useScriptStore = defineStore('script', {
  state: () => ({
    scripts: [] as Script[],
    currentScript: null as Script | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchScripts() {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.get('/scripts', {
          params: { include: 'etat,demande,serveurs' }
        })
        this.scripts = response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching scripts')
      } finally {
        this.loading = false
      }
    },

    async fetchScriptById(id: number) {
      this.loading = true
      try {
        const response = await apiClient.get(`/scripts/${id}`, {
          params: { include: 'etat,demande,serveurs' }
        })
        this.currentScript = response.data
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching script details')
        throw error
      } finally {
        this.loading = false
      }
    },

    async createScript(payload: ScriptCreatePayload) {
      this.loading = true
      try {
        const response = await apiClient.post('/scripts', payload)
        this.scripts.unshift(response.data)
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error creating script')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateScript(script: Script) {
      this.loading = true
      try {
        const { id, ...payload } = script
        const response = await apiClient.put(`/scripts/${id}`, payload)
        
        const index = this.scripts.findIndex(s => s.id === id)
        if (index !== -1) {
          this.scripts[index] = response.data
        }
        
        if (this.currentScript?.id === id) {
          this.currentScript = response.data
        }
        
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error updating script')
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteScript(id: number) {
      this.loading = true
      try {
        await apiClient.delete(`/scripts/${id}`)
        this.scripts = this.scripts.filter(s => s.id !== id)
        
        if (this.currentScript?.id === id) {
          this.currentScript = null
        }
      } catch (error: any) {
        this.handleError(error, 'Error deleting script')
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
    getScriptById: (state) => (id: number) => {
      return state.scripts.find(s => s.id === id)
    },
    
    scriptsByDemande: (state) => (demandeId: number) => {
      return state.scripts.filter(s => s.demande_id === demandeId)
    },
    
    totalScripts: (state) => state.scripts.length
  }
})