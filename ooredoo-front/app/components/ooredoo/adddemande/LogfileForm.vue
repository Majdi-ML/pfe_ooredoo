<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLogfileStore } from '@/stores/logfile.store'
import { useEnumStore } from '@/stores/enumStore'
import { useDemandeStore } from '@/stores/demande.store'
import { useServeurStore } from '@/stores/serveur.store'
import type { Serveur } from '@/interfaces/Serveur'
import type { Demande } from '@/interfaces/Demande'

const props = defineProps<{ demandeId: number | null }>()
const logfileStore = useLogfileStore()
const enumStore = useEnumStore()
const demandeStore = useDemandeStore()
const serveurStore = useServeurStore()

const form = ref({
  ref: '',
  etat_id: 1,
  refComposant: '',
  rgSgSiCluster: '',
  logfile: '',
  localisation: '',
  description: '',
  formatLogfile: '',
  separateur: '',
  intervalleDePolling: '',
  monitoredBy_id: null as number | null,
  fourniEnAnnexe: '',
  refService: '',
  nomTemplate: '',
  logConditions: '',
  demande_id: null as number | null,
  serveurs_ids: [] as number[]
})

const errorMessage = ref<string | null>(null)

onMounted(async () => {
  await enumStore.fetchAllEnums()
  await logfileStore.fetchLogfiles()
  if (props.demandeId) {
    await demandeStore.fetchDemandeById(props.demandeId)
    await fetchServeursByPlatform()
  }
})

const currentPlatformServiceId = computed(() => {
  return (demandeStore.currentDemande as Demande)?.serviceplatfom_id || null
})

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
    form.value.demande_id = props.demandeId
    await logfileStore.createLogfile(form.value)
    form.value = {
      ref: '',
      etat_id: 1,
      refComposant: '',
      rgSgSiCluster: '',
      logfile: '',
      localisation: '',
      description: '',
      formatLogfile: '',
      separateur: '',
      intervalleDePolling: '',
      monitoredBy_id: null,
      fourniEnAnnexe: '',
      refService: '',
      nomTemplate: '',
      logConditions: '',
      demande_id: props.demandeId,
      serveurs_ids: []
    }
    errorMessage.value = null
    await logfileStore.fetchLogfiles()
  } catch (error: unknown) {
    errorMessage.value = error instanceof Error ? error.message : 'Error creating logfile'
    console.error('Error creating logfile:', error)
  }
}
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Ajouter un Logfile</h3>
    
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
        <label class="block text-sm font-medium">Référence Composant</label>
        <input
          v-model="form.refComposant"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">RG/SG/SI Cluster</label>
        <input
          v-model="form.rgSgSiCluster"
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
        <label class="block text-sm font-medium">Logfile</label>
        <input
          v-model="form.logfile"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Localisation</label>
        <input
          v-model="form.localisation"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Description</label>
        <textarea
          v-model="form.description"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          rows="4"
        />
      </div>
      <div>
        <label class="block text-sm font-medium">Format Logfile</label>
        <input
          v-model="form.formatLogfile"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Séparateur</label>
        <input
          v-model="form.separateur"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Intervalle de Polling</label>
        <input
          v-model="form.intervalleDePolling"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Monitored By</label>
        <select
          v-model="form.monitoredBy_id"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option v-for="monitored in enumStore.monitoredBys" :key="monitored.id" :value="monitored.id">
            {{ monitored.nom }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium">Fourni en Annexe</label>
        <input
          v-model="form.fourniEnAnnexe"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Référence Service</label>
        <input
          v-model="form.refService"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Nom Template</label>
        <input
          v-model="form.nomTemplate"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Conditions Log</label>
        <textarea
          v-model="form.logConditions"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          rows="4"
        />
      </div>
      <div>
        <UiButton 
          type="submit" 
          :disabled="logfileStore.loading || !props.demandeId"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          <span v-if="logfileStore.loading">Enregistrement...</span>
          <span v-else>Ajouter le Logfile</span>
        </UiButton>
      </div>
    </form>

    <div v-if="props.demandeId" class="mt-6">
      <h4 class="text-md font-medium mb-2">Logfiles associés à la demande</h4>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700">
            <th class="border p-2">Référence</th>
            <th class="border p-2">Logfile</th>
            <th class="border p-2">Localisation</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="logfile in logfileStore.logfilesByDemande(props.demandeId)"
            :key="logfile.id"
            class="border-b"
          >
            <td class="border p-2">{{ logfile.ref }}</td>
            <td class="border p-2">{{ logfile.logfile }}</td>
            <td class="border p-2">{{ logfile.localisation }}</td>
            <td class="border p-2">
              <UiButton
                size="sm"
                variant="destructive"
                @click="logfileStore.deleteLogfile(logfile.id)"
                class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                Supprimer
              </UiButton>
            </td>
          </tr>
          <tr v-if="!logfileStore.logfilesByDemande(props.demandeId).length">
            <td colspan="4" class="text-center p-4">Aucun logfile associé</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>