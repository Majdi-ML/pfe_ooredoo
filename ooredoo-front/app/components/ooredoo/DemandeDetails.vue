<template>
  <div class="container mx-auto py-8">
    <div class="mb-6">
      <UiButton variant="outline" @click="router.back()">
        <Icon name="lucide:arrow-left" class="mr-2 h-4 w-4" />
        Retour
      </UiButton>
    </div>

    <div class="bg-white shadow rounded-lg p-6 mb-8">
      <h1 class="text-2xl font-bold mb-4">Détails de la demande #{{ demande?.id }}</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Statut</h3>
          <p class="mt-1">{{ demande?.status?.nom }}</p>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-500">Plateforme Service</h3>
          <p class="mt-1">{{ demande?.serviceplatfom?.nom }}</p>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-500">Description</h3>
          <p class="mt-1">{{ demande?.description }}</p>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-500">Date création</h3>
          <p class="mt-1">{{ formatDate(demande?.created_at) }}</p>
        </div>
        <div>
          <h3 class="text-sm font-medium text-gray-500">Date modification</h3>
          <p class="mt-1">{{ formatDate(demande?.updated_at) }}</p>
        </div>
      </div>
    </div>

    <!-- Sections pour chaque type de données associées -->
    <template v-for="(section, sectionName) in sections" :key="sectionName">
      <div v-if="demande?.[sectionName]?.length" class="bg-white shadow rounded-lg p-6 mb-8">
        <h2 class="text-xl font-bold mb-4">{{ section.title }}</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th 
                  v-for="(header, idx) in section.headers" 
                  :key="idx"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(item, itemIdx) in demande[sectionName]" :key="itemIdx">
                <td 
                  v-for="(header, idx) in section.headers" 
                  :key="idx"
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {{ item[section.keys[idx]] || '—' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDemandeStore } from '~/stores/demande.store'
import type { Demande } from '@/interfaces/Demande'

const route = useRoute()
const router = useRouter()
const demandeStore = useDemandeStore()
const demande = ref<Demande | null>(null)

const sections = {
  clusters: {
    title: 'Clusters',
    headers: ['ID', 'Référence', 'Adresse IP', 'Logiciel', 'Version', 'Mode'],
    keys: ['id', 'ref', 'adresseIp', 'logicielCluster', 'version', 'mode']
  },
  serveurs: {
    title: 'Serveurs',
    headers: ['ID', 'Référence', 'Hostname', 'FQDN', 'Modèle', 'Cluster'],
    keys: ['id', 'ref', 'hostname', 'fqdn', 'modele', 'cluster']
  },
  logfiles: {
    title: 'Logfiles',
    headers: ['ID', 'Référence', 'Fichier', 'Localisation', 'Format', 'Intervalle'],
    keys: ['id', 'ref', 'logfile', 'localisation', 'formatLogfile', 'intervalleDePolling']
  },
  logfilespatterns: {
    title: 'Patterns Logfiles',
    headers: ['ID', 'Référence', 'Signification', 'Identification', 'Message Alarme', 'Instructions'],
    keys: ['id', 'ref', 'signification', 'identification', 'messageAlarme', 'instructions']
  },
  processes: {
    title: 'Processus',
    headers: ['ID', 'Référence', 'Process', 'Message Alarme', 'Intervalle', 'Objet'],
    keys: ['id', 'ref', 'process', 'messageAlarme', 'intervalleDePolling', 'objet']
  },
  requetessqls: {
    title: 'Requêtes SQL',
    headers: ['ID', 'Référence', 'Requête SQL', 'Résultat Attendu', 'Message Alarme', 'Intervalle'],
    keys: ['id', 'ref', 'requeteSql', 'resultatAttenduDeLaRequete', 'messageAlarme', 'intervalleDePolling']
  },
  scripts: {
    title: 'Scripts',
    headers: ['ID', 'Référence', 'Script', 'Code Erreur', 'Description', 'Instructions'],
    keys: ['id', 'ref', 'script', 'codeErreur', 'description', 'instructions']
  },
  trapssnmps: {
    title: 'Traps SNMP',
    headers: ['ID', 'Référence', 'Signification', 'OID', 'Message Alarme', 'Instructions'],
    keys: ['id', 'ref', 'signification', 'oid', 'messageAlarme', 'instructions']
  },
  urls: {
    title: 'URLs',
    headers: ['ID', 'Référence', 'URL', 'Action', 'Message Alarme', 'Intervalle'],
    keys: ['id', 'ref', 'url', 'performAction', 'messageAlarme', 'intervalleDePolling']
  }
}

const formatDate = (dateString: string) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(async () => {
  const demandeId = Number(route.params.id)
  await demandeStore.fetchDemandes()
  demande.value = demandeStore.getDemandeById(demandeId)
})
</script>