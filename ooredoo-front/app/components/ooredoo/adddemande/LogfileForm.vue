<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\adddemande\LogfileForm.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useLogfileStore } from '@/stores/logfile.store'
import { useEnumStore } from '@/stores/enumStore'

const props = defineProps<{ demandeId: number | null }>()
const logfileStore = useLogfileStore()
const enumStore = useEnumStore()

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

const submitForm = async () => {
  if (!props.demandeId) return
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
    await logfileStore.fetchLogfiles()
  } catch (error) {
    console.error('Erreur lors de la création du logfile:', error)
  }
}

logfileStore.fetchLogfiles()
enumStore.fetchAllEnums()
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Ajouter un Logfile</h3>
    <form class="space-y-4" @submit.prevent="submitForm">
      <div>
        <label class="block text-sm font-medium">Référence</label>
        <input
          v-model="form.ref"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
        >
      </div>
      <div>
        <label class="block text-sm font-medium">État</label>
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
        <UiButton type="submit" :disabled="logfileStore.loading || !demandeId">
          Ajouter le Logfile
        </UiButton>
      </div>
    </form>

    <div v-if="demandeId" class="mt-6">
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
            v-for="logfile in logfileStore.logfilesByDemande(demandeId)"
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
              >
                Supprimer
              </UiButton>
            </td>
          </tr>
          <tr v-if="!logfileStore.logfilesByDemande(demandeId).length">
            <td colspan="4" class="text-center p-4">Aucun logfile associé</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>