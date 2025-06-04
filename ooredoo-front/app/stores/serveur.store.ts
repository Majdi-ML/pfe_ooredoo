import { defineStore } from 'pinia'
import axios from 'axios'
import type { Serveur, ServeurCreatePayload } from '@/interfaces/Serveur'
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const useServeurStore = defineStore('serveur', {
  state: () => ({
    serveurs: [] as Serveur[],
    currentServeur: null as Serveur | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchServeurs() {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.get('/serveurs', {
          params: { include: 'etat,platforme,typeserveur,serviceslatform,os,soclestandardomu,demande' }
        })
        this.serveurs = response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching serveurs')
      } finally {
        this.loading = false
      }
    },

    async fetchServeurById(id: number) {
      this.loading = true
      try {
        const response = await apiClient.get(`/serveurs/${id}`, {
          params: { include: 'etat,platforme,typeserveur,serviceplatform,os,soclestandardomu,demande' }
        })
        this.currentServeur = response.data
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching serveur details')
        throw error
      } finally {
        this.loading = false
      }
    },

    async createServeur(payload: ServeurCreatePayload) {
      this.loading = true
      try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie')
        const response = await apiClient.post('/serveurs', payload)
        this.serveurs.unshift(response.data)
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error creating serveur')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateServeur(serveur: Serveur) {
      this.loading = true
      try {
        const { id, ...payload } = serveur
        const response = await apiClient.put(`/serveurs/${id}`, payload)
        
        const index = this.serveurs.findIndex(s => s.id === id)
        if (index !== -1) {
          this.serveurs[index] = response.data
        }
        
        if (this.currentServeur?.id === id) {
          this.currentServeur = response.data
        }
        
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error updating serveur')
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteServeur(id: number) {
      this.loading = true
      try {
        await apiClient.delete(`/serveurs/${id}`)
        this.serveurs = this.serveurs.filter(s => s.id !== id)
        
        if (this.currentServeur?.id === id) {
          this.currentServeur = null
        }
      } catch (error: any) {
        this.handleError(error, 'Error deleting serveur')
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
    getServeurById: (state) => (id: number) => {
      return state.serveurs.find(s => s.id === id)
    },
    
    serveursByDemande: (state) => (demandeId: number) => {
      return state.serveurs.filter(s => s.demande_id === demandeId)
    },
    
    totalServeurs: (state) => state.serveurs.length
  }
})
