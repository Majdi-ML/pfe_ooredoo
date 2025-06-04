<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\adddemande\UrlForm.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useUrlStore } from '@/stores/url.store'
import { useEnumStore } from '@/stores/enumStore'

defineProps<{ demandeId: number | null }>()
const urlStore = useUrlStore()
const enumStore = useEnumStore()

const form = ref({
  ref: '',
  etat_id: 1,
  refComposant: '',
  rgSgSiCluster: '',
  url: '',
  performAction: '',
  criticite_id: null as number | null,
  messageAlarme: '',
  instructions: '',
  intervalleDePolling: '',
  refService: '',
  objet: '',
  monitoredBy_id: null as number | null,
  nomTemplate: '',
  demande_id: null as number | null,
  serveurs_ids: null as number | null
})

const submitForm = async () => {
  if (!props.demandeId) return
  try {
    form.value.demande_id = props.demandeId
    await urlStore.createUrl(form.value)
    form.value = {
      ref: '',
      etat_id: 1,
      refComposant: '',
      rgSgSiCluster: '',
      url: '',
      performAction: '',
      criticite_id: null,
      messageAlarme: '',
      instructions: '',
      intervalleDePolling: '',
      refService: '',
      objet: '',
      monitoredBy_id: null,
      nomTemplate: '',
      demande_id: props.demandeId,
      serveurs_ids: null
    }
    await urlStore.fetchUrls()
  } catch (error) {
    console.error('Erreur lors de la création de l\'URL:', error)
  }
}

urlStore.fetchUrls()
enumStore.fetchAllEnums()
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Ajouter une URL</h3>
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
        <label class="block text-sm font-medium">URL</label>
        <input
          v-model="form.url"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Perform Action</label>
        <input
          v-model="form.performAction"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Criticité</label>
        <select
          v-model="form.criticite_id"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option v-for="criticite in enumStore.criticites" :key="criticite.id" :value="criticite.id">
            {{ criticite.nom }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium">Message Alarme</label>
        <input
          v-model="form.messageAlarme"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Instructions</label>
        <textarea
          v-model="form.instructions"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          rows="4"
        />
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
        <label class="block text-sm font-medium">Référence Service</label>
        <input
          v-model="form.refService"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Objet</label>
        <input
          v-model="form.objet"
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
        <label class="block text-sm font-medium">Nom Template</label>
        <input
          v-model="form.nomTemplate"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <UiButton type="submit" :disabled="urlStore.loading || !demandeId">
          Ajouter l'URL
        </UiButton>
      </div>
    </form>

    <div v-if="demandeId" class="mt-6">
      <h4 class="text-md font-medium mb-2">URLs associées à la demande</h4>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700">
            <th class="border p-2">Référence</th>
            <th class="border p-2">URL</th>
            <th class="border p-2">Message Alarme</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="url in urlStore.urlsByDemande(demandeId)"
            :key="url.id"
            class="border-b"
          >
            <td class="border p-2">{{ url.ref }}</td>
            <td class="border p-2">{{ url.url }}</td>
            <td class="border p-2">{{ url.messageAlarme }}</td>
            <td class="border p-2">
              <UiButton
                size="sm"
                variant="destructive"
                @click="urlStore.deleteUrl(url.id)"
              >
                Supprimer
              </UiButton>
            </td>
          </tr>
          <tr v-if="!urlStore.urlsByDemande(demandeId).length">
            <td colspan="4" class="text-center p-4">Aucune URL associée</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>