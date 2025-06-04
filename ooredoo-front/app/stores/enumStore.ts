import { defineStore } from 'pinia'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const useEnumStore = defineStore('enum', {
  state: () => ({
    etats: [] as any[],
    criticites: [] as any[],
    platformes: [] as any[],
    typesServeurs: [] as any[],
    osList: [] as any[],
    soclesStandardOMU: [] as any[],
    monitoredBys: [] as any[],
    versionsTechFirmware: [] as any[],
    versionsSNMP: [] as any[],
    status: [] as any[],
    servicePlatformes: [] as any[],
    supports: [] as any[],
    roles: [] as any[],
    loading: false,
    error: null as string | null
  }),

  actions: {
    async fetchAllEnums() {
      this.loading = true
      try {
        await Promise.all([
          this.fetchEtats(),
          this.fetchCriticites(),
          this.fetchPlatformes(),
          this.fetchTypesServeurs(),
          this.fetchOSList(),
          this.fetchServicePlatformes(),
          this.fetchSoclesStandardOMU(),
          this.fetchMonitoredBys(),
          this.fetchVersionsTechFirmware(),
          this.fetchVersionsSNMP(),
          this.fetchStatus(),
          this.fetchSupports(),
          this.fetchRoles()
        ])
      } catch (error) {
        this.handleError(error, 'Error fetching enum values')
      } finally {
        this.loading = false
      }
    },

    async fetchEtats() {
      try {
        const response = await apiClient.get('/etat')
        this.etats = response.data
      } catch (error) {
        this.handleError(error, 'Error fetching etats')
      }
    },

    async fetchCriticites() {
      try {
        const response = await apiClient.get('/criticites')
        this.criticites = response.data
      } catch (error) {
        this.handleError(error, 'Error fetching criticites')
      }
    },

    async fetchPlatformes() {
      try {
        const response = await apiClient.get('/platformes')
        this.platformes = response.data
      } catch (error) {
        this.handleError(error, 'Error fetching platformes')
      }
    },

    async fetchServicePlatformes() {
      try {
        const response = await apiClient.get('/serviceplatfoms')
        this.servicePlatformes = response.data
      } catch (error) {
        this.handleError(error, 'Error fetching service platformes')
      }
    },

    async fetchTypesServeurs() {
      try {
        const response = await apiClient.get('/typeserveurs')
        this.typesServeurs = response.data
      } catch (error) {
        this.handleError(error, 'Error fetching types serveurs')
      }
    },

    async fetchOSList() {
      try {
        const response = await apiClient.get('/os')
        this.osList = response.data
      } catch (error) {
        this.handleError(error, 'Error fetching OS list')
      }
    },

    async fetchSoclesStandardOMU() {
      try {
        const response = await apiClient.get('/soclestandardomu')
        this.soclesStandardOMU = response.data
      } catch (error) {
        this.handleError(error, 'Error fetching socles standard OMU')
      }
    },

    async fetchMonitoredBys() {
      try {
        const response = await apiClient.get('/monitoredby')
        this.monitoredBys = response.data
      } catch (error) {
        this.handleError(error, 'Error fetching monitored by options')
      }
    },

    async fetchVersionsTechFirmware() {
      try {
        const response = await apiClient.get('/vertechfirmwares')
        this.versionsTechFirmware = response.data
      } catch (error) {
        this.handleError(error, 'Error fetching tech firmware versions')
      }
    },

    async fetchVersionsSNMP() {
      try {
        const response = await apiClient.get('/versionsnmp')
        this.versionsSNMP = response.data
      } catch (error) {
        this.handleError(error, 'Error fetching SNMP versions')
      }
    },

    async fetchStatus() {
      try {
        const response = await apiClient.get('/status')
        this.status = response.data
      } catch (error) {
        this.handleError(error, 'Error fetching status')
      }
    },

    async fetchSupports() {
      try {
        const response = await apiClient.get('/support')
        this.supports = response.data
      } catch (error) {
        this.handleError(error, 'Error fetching supports')
      }
    },

    async fetchRoles() {
      try {
        const response = await apiClient.get('/role')
        this.roles = response.data
      } catch (error) {
        this.handleError(error, 'Error fetching roles')
      }
    },

    handleError(error: any, context: string) {
      this.error = error.response?.data?.message || error.message
      console.error(`${context}:`, error)
      return this.error
    }
  },

  getters: {
    getEtatById: (state) => (id: number) => state.etats.find(e => e.id === id),
    getCriticiteById: (state) => (id: number) => state.criticites.find(c => c.id === id),
    getPlatformeById: (state) => (id: number) => state.platformes.find(p => p.id === id),
    getTypeServeurById: (state) => (id: number) => state.typesServeurs.find(t => t.id === id),
    getOSById: (state) => (id: number) => state.osList.find(o => o.id === id),
    getSocleStandardOMUById: (state) => (id: number) => state.soclesStandardOMU.find(s => s.id === id),
    getMonitoredByById: (state) => (id: number) => state.monitoredBys.find(m => m.id === id),
    getVersionTechFirmwareById: (state) => (id: number) => state.versionsTechFirmware.find(v => v.id === id),
    getVersionSNMPById: (state) => (id: number) => state.versionsSNMP.find(v => v.id === id),
    getStatusById: (state) => (id: number) => state.status.find(s => s.id === id),
    getServicePlatformeById: (state) => (id: number) => state.servicePlatformes.find(sp => sp.id === id),
    getSupportById: (state) => (id: number) => state.supports.find(s => s.id === id),
    getRoleById: (state) => (id: number) => state.roles.find(r => r.id === id)
  }
})