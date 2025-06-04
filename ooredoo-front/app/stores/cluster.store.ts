import { defineStore } from 'pinia'
import axios from 'axios'
import type { Cluster, ClusterCreatePayload } from '@/interfaces/Cluster'
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

export const useClusterStore = defineStore('cluster', {
  state: () => ({
    clusters: [] as Cluster[],
    currentCluster: null as Cluster | null,
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchClusters() {
      this.loading = true
      this.error = null
      try {
        const response = await apiClient.get('/clusters', {
          params: { include: 'etat,demande,serveurs' }
        })
        this.clusters = response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching clusters')
      } finally {
        this.loading = false
      }
    },

    async fetchClusterById(id: number) {
      this.loading = true
      try {
        const response = await apiClient.get(`/clusters/${id}`, {
          params: { include: 'etat,demande,serveurs' }
        })
        this.currentCluster = response.data
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error fetching cluster details')
        throw error
      } finally {
        this.loading = false
      }
    },

    async createCluster(payload: ClusterCreatePayload) {
      this.loading = true
      try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie')
        const response = await apiClient.post('/clusters', payload)
        this.clusters.unshift(response.data)
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error creating cluster')
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateCluster(cluster: Cluster) {
      this.loading = true
      try {
        const { id, ...payload } = cluster
        const response = await apiClient.put(`/clusters/${id}`, payload)
        
        const index = this.clusters.findIndex(c => c.id === id)
        if (index !== -1) {
          this.clusters[index] = response.data
        }
        
        if (this.currentCluster?.id === id) {
          this.currentCluster = response.data
        }
        
        return response.data
      } catch (error: any) {
        this.handleError(error, 'Error updating cluster')
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteCluster(id: number) {
      this.loading = true
      try {
        await apiClient.delete(`/clusters/${id}`)
        this.clusters = this.clusters.filter(c => c.id !== id)
        
        if (this.currentCluster?.id === id) {
          this.currentCluster = null
        }
      } catch (error: any) {
        this.handleError(error, 'Error deleting cluster')
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
    getClusterById: (state) => (id: number) => {
      return state.clusters.find(c => c.id === id)
    },
    
    clustersByDemande: (state) => (demandeId: number) => {
      return state.clusters.filter(c => c.demande_id === demandeId)
    },
    
    totalClusters: (state) => state.clusters.length
  }
})