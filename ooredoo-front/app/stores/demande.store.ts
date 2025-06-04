import { defineStore } from 'pinia'
import axios from 'axios'
import type { Demande, DemandeCreatePayload } from '../interfaces/Demande'
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    
  }
})

export const useDemandeStore = defineStore('demande', {
  state: () => ({
    demandes: [] as Demande[],
    loading: false,
    error: null as string | null,
    currentDemande: null as Demande | null
  }),
  
  actions: {
    async fetchDemandes() {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.get('/demandes', {
          params: {
            include: 'status,user,serviceplatfom,clusters,serveurs,logfiles,processes,requetessqls,scripts,urls,trapssnmps,logfilespatterns'
          }
        })
        this.demandes = response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching demandes')
      } finally {
        this.loading = false
      }
    },
    
    async fetchDemandeById(id: number) {
      this.loading = true
      try {
        const response = await apiClient.get(`/demandes/${id}`, {
          params: {
            include: 'status,user,serviceplatfom,clusters,serveurs,logfiles,processes,requetessqls,scripts,urls,trapssnmps,logfilespatterns'
          }
        })
        this.currentDemande = response.data
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching demande details')
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async createDemande(payload: DemandeCreatePayload) {
      this.loading = true
      try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie')
        const response = await apiClient.post('/demandes/', payload) // Ajout du payload ici
        this.demandes.unshift(response.data)
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error creating demande')
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async updateDemande(demande: Demande) {
      this.loading = true
      try {
        const { id, ...payload } = demande
        const response = await apiClient.put(`/demandes/${id}`, payload)
        
        const index = this.demandes.findIndex(d => d.id === id)
        if (index !== -1) {
          this.demandes[index] = response.data
        }
        
        if (this.currentDemande?.id === id) {
          this.currentDemande = response.data
        }
        
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error updating demande')
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async deleteDemande(id: number) {
      this.loading = true
      try {
        await apiClient.delete(`/demandes/${id}`)
        this.demandes = this.demandes.filter(d => d.id !== id)
        
        if (this.currentDemande?.id === id) {
          this.currentDemande = null
        }
      } catch (error: any) {
        this.handleError(error, 'Error deleting demande')
        throw error
      } finally {
        this.loading = false
      }
    },
    
    // Méthode de gestion d'erreur sans modificateur private
    handleError(error: any, context: string) {
      this.error = error.response?.data?.message || error.message
      console.error(`${context}:`, error)
      return this.error
    }
  },
  
  getters: {
    getDemandeById: (state) => (id: number) => {
      return state.demandes.find(d => d.id === id)
    },
    
    demandesByStatus: (state) => (statusId: number) => {
      return state.demandes.filter(d => d.status_id === statusId)
    },
    
    demandesByUser: (state) => (userId: number) => {
      return state.demandes.filter(d => d.user_id === userId)
    },
    
    totalDemandes: (state) => state.demandes.length,
    
    pendingDemandes: (state) => {
      return state.demandes.filter(d => d.status_id === 1)
    },
    
    completedDemandes: (state) => {
      return state.demandes.filter(d => d.status_id === 2)
    }
  }
})