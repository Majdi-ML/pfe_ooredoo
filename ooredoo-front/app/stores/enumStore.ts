
import { defineStore } from 'pinia'
import axios from 'axios'

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

    // Fetch methods
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

    // CRUD methods
    async createEtats(data: { nom: string }) {
      try {
        const response = await apiClient.post('/etat', data)
        this.etats.push(response.data)
      } catch (error) {
        this.handleError(error, 'Error creating etat')
      }
    },
    async updateEtats(data: { id: number; nom: string }) {
      try {
        const response = await apiClient.put(`/etat/${data.id}`, data)
        const index = this.etats.findIndex(e => e.id === data.id)
        if (index !== -1) this.etats[index] = response.data
      } catch (error) {
        this.handleError(error, 'Error updating etat')
      }
    },
    async deleteEtats(id: number) {
      try {
        await apiClient.delete(`/etat/${id}`)
        this.etats = this.etats.filter(e => e.id !== id)
      } catch (error) {
        this.handleError(error, 'Error deleting etat')
      }
    },

    async createCriticites(data: { nom: string }) {
      try {
        const response = await apiClient.post('/criticites', data)
        this.criticites.push(response.data)
      } catch (error) {
        this.handleError(error, 'Error creating criticite')
      }
    },
    async updateCriticites(data: { id: number; nom: string }) {
      try {
        const response = await apiClient.put(`/criticites/${data.id}`, data)
        const index = this.criticites.findIndex(c => c.id === data.id)
        if (index !== -1) this.criticites[index] = response.data
      } catch (error) {
        this.handleError(error, 'Error updating criticite')
      }
    },
    async deleteCriticites(id: number) {
      try {
        await apiClient.delete(`/criticites/${id}`)
        this.criticites = this.criticites.filter(c => c.id !== id)
      } catch (error) {
        this.handleError(error, 'Error deleting criticite')
      }
    },

    async createPlatformes(data: { nom: string }) {
      try {
        const response = await apiClient.post('/platformes', data)
        this.platformes.push(response.data)
      } catch (error) {
        this.handleError(error, 'Error creating platforme')
      }
    },
    async updatePlatformes(data: { id: number; nom: string }) {
      try {
        const response = await apiClient.put(`/platformes/${data.id}`, data)
        const index = this.platformes.findIndex(p => p.id === data.id)
        if (index !== -1) this.platformes[index] = response.data
      } catch (error) {
        this.handleError(error, 'Error updating platforme')
      }
    },
    async deletePlatformes(id: number) {
      try {
        await apiClient.delete(`/platformes/${id}`)
        this.platformes = this.platformes.filter(p => p.id !== id)
      } catch (error) {
        this.handleError(error, 'Error deleting platforme')
      }
    },

    async createServicePlatformes(data: { nom: string }) {
      try {
        const response = await apiClient.post('/serviceplatfoms', data)
        this.servicePlatformes.push(response.data)
      } catch (error) {
        this.handleError(error, 'Error creating service platforme')
      }
    },
    async updateServicePlatformes(data: { id: number; nom: string }) {
      try {
        const response = await apiClient.put(`/serviceplatfoms/${data.id}`, data)
        const index = this.servicePlatformes.findIndex(sp => sp.id === data.id)
        if (index !== -1) this.servicePlatformes[index] = response.data
      } catch (error) {
        this.handleError(error, 'Error updating service platforme')
      }
    },
    async deleteServicePlatformes(id: number) {
      try {
        await apiClient.delete(`/serviceplatfoms/${id}`)
        this.servicePlatformes = this.servicePlatformes.filter(sp => sp.id !== id)
      } catch (error) {
        this.handleError(error, 'Error deleting service platforme')
      }
    },

    async createTypesServeurs(data: { nom: string }) {
      try {
        const response = await apiClient.post('/typeserveurs', data)
        this.typesServeurs.push(response.data)
      } catch (error) {
        this.handleError(error, 'Error creating type serveur')
      }
    },
    async updateTypesServeurs(data: { id: number; nom: string }) {
      try {
        const response = await apiClient.put(`/typeserveurs/${data.id}`, data)
        const index = this.typesServeurs.findIndex(t => t.id === data.id)
        if (index !== -1) this.typesServeurs[index] = response.data
      } catch (error) {
        this.handleError(error, 'Error updating type serveur')
      }
    },
    async deleteTypesServeurs(id: number) {
      try {
        await apiClient.delete(`/typeserveurs/${id}`)
        this.typesServeurs = this.typesServeurs.filter(t => t.id !== id)
      } catch (error) {
        this.handleError(error, 'Error deleting type serveur')
      }
    },

    async createOSList(data: { nom: string }) {
      try {
        const response = await apiClient.post('/os', data)
        this.osList.push(response.data)
      } catch (error) {
        this.handleError(error, 'Error creating OS')
      }
    },
    async updateOSList(data: { id: number; nom: string }) {
      try {
        const response = await apiClient.put(`/os/${data.id}`, data)
        const index = this.osList.findIndex(o => o.id === data.id)
        if (index !== -1) this.osList[index] = response.data
      } catch (error) {
        this.handleError(error, 'Error updating OS')
      }
    },
    async deleteOSList(id: number) {
      try {
        await apiClient.delete(`/os/${id}`)
        this.osList = this.osList.filter(o => o.id !== id)
      } catch (error) {
        this.handleError(error, 'Error deleting OS')
      }
    },

    async createSoclesStandardOMU(data: { nom: string }) {
      try {
        const response = await apiClient.post('/soclestandardomu', data)
        this.soclesStandardOMU.push(response.data)
      } catch (error) {
        this.handleError(error, 'Error creating socle standard OMU')
      }
    },
    async updateSoclesStandardOMU(data: { id: number; nom: string }) {
      try {
        const response = await apiClient.put(`/soclestandardomu/${data.id}`, data)
        const index = this.soclesStandardOMU.findIndex(s => s.id === data.id)
        if (index !== -1) this.soclesStandardOMU[index] = response.data
      } catch (error) {
        this.handleError(error, 'Error updating socle standard OMU')
      }
    },
    async deleteSoclesStandardOMU(id: number) {
      try {
        await apiClient.delete(`/soclestandardomu/${id}`)
        this.soclesStandardOMU = this.soclesStandardOMU.filter(s => s.id !== id)
      } catch (error) {
        this.handleError(error, 'Error deleting socle standard OMU')
      }
    },

    async createMonitoredBys(data: { nom: string }) {
      try {
        const response = await apiClient.post('/monitoredby', data)
        this.monitoredBys.push(response.data)
      } catch (error) {
        this.handleError(error, 'Error creating monitored by')
      }
    },
    async updateMonitoredBys(data: { id: number; nom: string }) {
      try {
        const response = await apiClient.put(`/monitoredby/${data.id}`, data)
        const index = this.monitoredBys.findIndex(m => m.id === data.id)
        if (index !== -1) this.monitoredBys[index] = response.data
      } catch (error) {
        this.handleError(error, 'Error updating monitored by')
      }
    },
    async deleteMonitoredBys(id: number) {
      try {
        await apiClient.delete(`/monitoredby/${id}`)
        this.monitoredBys = this.monitoredBys.filter(m => m.id !== id)
      } catch (error) {
        this.handleError(error, 'Error deleting monitored by')
      }
    },

    async createVersionsTechFirmware(data: { nom: string }) {
      try {
        const response = await apiClient.post('/vertechfirmwares', data)
        this.versionsTechFirmware.push(response.data)
      } catch (error) {
        this.handleError(error, 'Error creating version tech firmware')
      }
    },
    async updateVersionsTechFirmware(data: { id: number; nom: string }) {
      try {
        const response = await apiClient.put(`/vertechfirmwares/${data.id}`, data)
        const index = this.versionsTechFirmware.findIndex(v => v.id === data.id)
        if (index !== -1) this.versionsTechFirmware[index] = response.data
      } catch (error) {
        this.handleError(error, 'Error updating version tech firmware')
      }
    },
    async deleteVersionsTechFirmware(id: number) {
      try {
        await apiClient.delete(`/vertechfirmwares/${id}`)
        this.versionsTechFirmware = this.versionsTechFirmware.filter(v => v.id !== id)
      } catch (error) {
        this.handleError(error, 'Error deleting version tech firmware')
      }
    },

    async createVersionsSNMP(data: { nom: string }) {
      try {
        const response = await apiClient.post('/versionsnmp', data)
        this.versionsSNMP.push(response.data)
      } catch (error) {
        this.handleError(error, 'Error creating version SNMP')
      }
    },
    async updateVersionsSNMP(data: { id: number; nom: string }) {
      try {
        const response = await apiClient.put(`/versionsnmp/${data.id}`, data)
        const index = this.versionsSNMP.findIndex(v => v.id === data.id)
        if (index !== -1) this.versionsSNMP[index] = response.data
      } catch (error) {
        this.handleError(error, 'Error updating version SNMP')
      }
    },
    async deleteVersionsSNMP(id: number) {
      try {
        await apiClient.delete(`/versionsnmp/${id}`)
        this.versionsSNMP = this.versionsSNMP.filter(v => v.id !== id)
      } catch (error) {
        this.handleError(error, 'Error deleting version SNMP')
      }
    },

    async createStatus(data: { nom: string }) {
      try {
        const response = await apiClient.post('/status', data)
        this.status.push(response.data)
      } catch (error) {
        this.handleError(error, 'Error creating status')
      }
    },
    async updateStatus(data: { id: number; nom: string }) {
      try {
        const response = await apiClient.put(`/status/${data.id}`, data)
        const index = this.status.findIndex(s => s.id === data.id)
        if (index !== -1) this.status[index] = response.data
      } catch (error) {
        this.handleError(error, 'Error updating status')
      }
    },
    async deleteStatus(id: number) {
      try {
        await apiClient.delete(`/status/${id}`)
        this.status = this.status.filter(s => s.id !== id)
      } catch (error) {
        this.handleError(error, 'Error deleting status')
      }
    },

    async createSupports(data: { support: string }) {
      try {
        const response = await apiClient.post('/support', data)
        this.supports.push(response.data)
      } catch (error) {
        this.handleError(error, 'Error creating support')
      }
    },
    async updateSupports(data: { id: number; support: string }) {
      try {
        const response = await apiClient.put(`/support/${data.id}`, data)
        const index = this.supports.findIndex(s => s.id === data.id)
        if (index !== -1) this.supports[index] = response.data
      } catch (error) {
        this.handleError(error, 'Error updating support')
      }
    },
    async deleteSupports(id: number) {
      try {
        await apiClient.delete(`/support/${id}`)
        this.supports = this.supports.filter(s => s.id !== id)
      } catch (error) {
        this.handleError(error, 'Error deleting support')
      }
    },

    async createRoles(data: { role: string }) {
      try {
        const response = await apiClient.post('/role', data)
        this.roles.push(response.data)
      } catch (error) {
        this.handleError(error, 'Error creating role')
      }
    },
    async updateRoles(data: { id: number; role: string }) {
      try {
        const response = await apiClient.put(`/role/${data.id}`, data)
        const index = this.roles.findIndex(r => r.id === data.id)
        if (index !== -1) this.roles[index] = response.data
      } catch (error) {
        this.handleError(error, 'Error updating role')
      }
    },
    async deleteRoles(id: number) {
      try {
        await apiClient.delete(`/role/${id}`)
        this.roles = this.roles.filter(r => r.id !== id)
      } catch (error) {
        this.handleError(error, 'Error deleting role')
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