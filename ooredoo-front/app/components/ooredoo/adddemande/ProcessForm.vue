<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\adddemande\ProcessForm.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useProcessStore } from '@/stores/process.store'
import { useEnumStore } from '@/stores/enumStore'

const props = defineProps<{ demandeId: number | null }>()
const processStore = useProcessStore()
const enumStore = useEnumStore()

const form = ref({
  ref: '',
  etat_id: 1,
  refComposant: '',
  process: '',
  criticite_id: null as number | null,
  messageAlarme: '',
  intervalleDePolling: '',
  objet: '',
  nomTemplate: '',
  monitoredBy_id: null as number | null,
  demande_id: null as number | null,
  serveurs_ids: null as number | null
})

const submitForm = async () => {
  if (!props.demandeId) return
  try {
    form.value.demande_id = props.demandeId
    await processStore.createProcess(form.value)
    form.value = {
      ref: '',
      etat_id: 1,
      refComposant: '',
      process: '',
      criticite_id: null,
      messageAlarme: '',
      intervalleDePolling: '',
      objet: '',
      nomTemplate: '',
      monitoredBy_id: null,
      demande_id: props.demandeId,
      serveurs_ids: null
    }
    await processStore.fetchProcesses()
  } catch (error) {
    console.error('Erreur lors de la création du processus:', error)
  }
}

processStore.fetchProcesses()
enumStore.fetchAllEnums()
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Ajouter un Processus</h3>
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
        <label class="block text-sm font-medium">Processus</label>
        <input
          v-model="form.process"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
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
        <label class="block text-sm font-medium">Intervalle de Polling</label>
        <input
          v-model="form.intervalleDePolling"
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
        <label class="block text-sm font-medium">Nom Template</label>
        <input
          v-model="form.nomTemplate"
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
        <UiButton type="submit" :disabled="processStore.loading || !demandeId">
          Ajouter le Processus
        </UiButton>
      </div>
    </form>

    <div v-if="demandeId" class="mt-6">
      <h4 class="text-md font-medium mb-2">Processus associés à la demande</h4>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700">
            <th class="border p-2">Référence</th>
            <th class="border p-2">Processus</th>
            <th class="border p-2">Message Alarme</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="process in processStore.processesByDemande(demandeId)"
            :key="process.id"
            class="border-b"
          >
            <td class="border p-2">{{ process.ref }}</td>
            <td class="border p-2">{{ process.process }}</td>
            <td class="border p-2">{{ process.messageAlarme }}</td>
            <td class="border p-2">
              <UiButton
                size="sm"
                variant="destructive"
                @click="processStore.deleteProcess(process.id)"
              >
                Supprimer
              </UiButton>
            </td>
          </tr>
          <tr v-if="!processStore.processesByDemande(demandeId).length">
            <td colspan="4" class="text-center p-4">Aucun processus associé</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>