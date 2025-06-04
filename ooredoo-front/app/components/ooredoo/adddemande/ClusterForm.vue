<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useClusterStore } from '@/stores/cluster.store'
import { useEnumStore } from '@/stores/enumStore'
import { useDemandeStore } from '@/stores/demande.store'
import { useServeurStore } from '@/stores/serveur.store'
import type { Serveur } from '@/interfaces/Serveur'
import type { Demande } from '@/interfaces/Demande'

const props = defineProps<{ demandeId: number | null }>()
const clusterStore = useClusterStore()
const enumStore = useEnumStore()
const demandeStore = useDemandeStore()
const serveurStore = useServeurStore()

// Form data
const form = ref({
  ref: '',
  etat_id: 1,
  nomDuRessourceGroupPackageServiceGuard: '',
  adresseIp: '',
  listeDesServeursConcernes: '',
  logicielCluster: '',
  version: '',
  mode: '',
  serveurActif: '',
  complementsInformations: '',
  demande_id: null as number | null,
  serveurs_ids: [] as number[]
})

const errorMessage = ref<string | null>(null)

// Fetch initial data
onMounted(async () => {
  await clusterStore.fetchClusters()
  await enumStore.fetchAllEnums()
  if (props.demandeId) {
    await demandeStore.fetchDemandeById(props.demandeId)
    await fetchServeursByPlatform()
  }
})

// Get current demande's platform service ID
const currentPlatformServiceId = computed(() => {
  return (demandeStore.currentDemande as Demande)?.serviceplatfom_id || null
})

// Fetch servers from the same platform service
const serveurs = ref<Serveur[]>([])
const fetchServeursByPlatform = async () => {
  if (!props.demandeId || !currentPlatformServiceId.value) {
    errorMessage.value = 'No platform service selected for this demande'
    return
  }
  try {
    await serveurStore.fetchServeurs()
    serveurs.value = serveurStore.serveurs.filter(
      (serveur: Serveur) => serveur.serviceplatfom_id === currentPlatformServiceId.value
    )
    if (serveurs.value.length === 0) {
      errorMessage.value = 'No servers found for the selected platform'
    }
  } catch (error: unknown) {
    errorMessage.value = error instanceof Error ? error.message : 'Error fetching servers'
    console.error('Error fetching servers:', error)
  }
}

// Submit form
const submitForm = async () => {
  if (!props.demandeId) {
    errorMessage.value = 'No demande ID provided'
    return
  }
  if (!form.value.ref || form.value.serveurs_ids.length === 0) {
    errorMessage.value = 'Reference and servers are required'
    return
  }
  try {
    // Prepare payload
    const payload = {
      ...form.value,
      demande_id: props.demandeId,
      serveurs_ids: form.value.serveurs_ids,
      listeDesServeursConcernes: serveurs.value
        .filter(s => form.value.serveurs_ids.includes(s.id))
        .map(s => s.hostname)
        .join(', ')
    }

    await clusterStore.createCluster(payload)
    
    // Reset form
    form.value = {
      ref: '',
      etat_id: 1,
      nomDuRessourceGroupPackageServiceGuard: '',
      adresseIp: '',
      listeDesServeursConcernes: '',
      logicielCluster: '',
      version: '',
      mode: '',
      serveurActif: '',
      complementsInformations: '',
      demande_id: props.demandeId,
      serveurs_ids: []
    }
    
    errorMessage.value = null
    await clusterStore.fetchClusters()
  } catch (error: unknown) {
    errorMessage.value = error instanceof Error ? error.message : 'Error creating cluster'
    console.error('Error creating cluster:', error)
  }
}
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Ajouter un cluster</h3>
    
    <!-- Error Message -->
    <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      {{ errorMessage }}
    </div>

    <form class="space-y-4" @submit.prevent="submitForm">
      <div>
        <label class="block text-sm font-medium">Référence*</label>
        <input
          v-model="form.ref"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
        >
      </div>
      
      <div>
        <label class="block text-sm font-medium">État*</label>
        <select
          v-model="form.etat_id"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option v-for="etat in enumStore.etats" :key="etat.id" :value="etat.id">
            {{ etat.nom }}
          </option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium">Nom du Resource Group</label>
        <input
          v-model="form.nomDuRessourceGroupPackageServiceGuard"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      
      <div>
        <label class="block text-sm font-medium">Adresse IP</label>
        <input
          v-model="form.adresseIp"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      
      <div>
        <label class="block text-sm font-medium">Serveurs concernés*</label>
        <select
          v-model="form.serveurs_ids"
          multiple
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600 h-auto min-h-[42px]"
          required
        >
          <option 
            v-for="serveur in serveurs" 
            :key="serveur.id" 
            :value="serveur.id"
          >
            {{ serveur.hostname }} (ID: {{ serveur.id }})
          </option>
        </select>
        <p class="text-xs text-gray-500 mt-1">
          Maintenez Ctrl (Windows) ou Command (Mac) pour sélectionner plusieurs serveurs. Servers are filtered by the demande's platform.
        </p>
      </div>
      
      <div>
        <label class="block text-sm font-medium">Logiciel Cluster</label>
        <input
          v-model="form.logicielCluster"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      
      <div>
        <label class="block text-sm font-medium">Version</label>
        <input
          v-model="form.version"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      
      <div>
        <label class="block text-sm font-medium">Mode</label>
        <input
          v-model="form.mode"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      
      <div>
        <label class="block text-sm font-medium">Serveur Actif</label>
        <select
          v-model="form.serveurActif"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="">Sélectionnez un serveur</option>
          <option 
            v-for="serveurId in form.serveurs_ids" 
            :key="serveurId" 
            :value="serveurs.find(s => s.id === serveurId)?.hostname || ''"
          >
            {{ serveurs.find(s => s.id === serveurId)?.hostname }}
          </option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium">Informations complémentaires</label>
        <textarea
          v-model="form.complementsInformations"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          rows="4"
        />
      </div>
      
      <div>
        <UiButton 
          type="submit" 
          :disabled="clusterStore.loading || !props.demandeId"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          <span v-if="clusterStore.loading">Enregistrement...</span>
          <span v-else>Ajouter le cluster</span>
        </UiButton>
      </div>
    </form>

    <div v-if="props.demandeId" class="mt-6">
      <h4 class="text-md font-medium mb-2">Clusters associés à la demande</h4>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700">
            <th class="border p-2">Référence</th>
            <th class="border p-2">Nom du Resource Group</th>
            <th class="border p-2">Adresse IP</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="cluster in clusterStore.clustersByDemande(props.demandeId)"
            :key="cluster.id"
            class="border-b"
          >
            <td class="border p-2">{{ cluster.ref }}</td>
            <td class="border p-2">{{ cluster.nomDuRessourceGroupPackageServiceGuard }}</td>
            <td class="border p-2">{{ cluster.adresseIp }}</td>
            <td class="border p-2">
              <UiButton
                size="sm"
                variant="destructive"
                @click="clusterStore.deleteCluster(cluster.id)"
                class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                Supprimer
              </UiButton>
            </td>
          </tr>
          <tr v-if="!clusterStore.clustersByDemande(props.demandeId).length">
            <td colspan="4" class="text-center p-4">Aucun cluster associé</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>