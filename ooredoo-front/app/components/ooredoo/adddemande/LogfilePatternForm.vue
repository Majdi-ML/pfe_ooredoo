<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\adddemande\LogfilePatternForm.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useLogfilePatternStore } from '@/stores/logfilePattern.store'
import { useEnumStore } from '@/stores/enumStore'

const props = defineProps<{ demandeId: number | null }>()
const patternStore = useLogfilePatternStore()
const enumStore = useEnumStore()

const form = ref({
  nRef: 0,
  ref: '',
  etat_id: 1,
  signification: '',
  identification: '',
  criticite_id: null as number | null,
  messageAlarme: '',
  instructions: '',
  performAction: '',
  acquittement: '',
  complementsInformations: '',
  refService: '',
  objet: '',
  logfile_id: null as number | null,
  demande_id: null as number | null
})

const submitForm = async () => {
  if (!props.demandeId) return
  try {
    form.value.demande_id = props.demandeId
    await patternStore.createPattern(form.value)
    form.value = {
      nRef: 0,
      ref: '',
      etat_id: 1,
      signification: '',
      identification: '',
      criticite_id: null,
      messageAlarme: '',
      instructions: '',
      performAction: '',
      acquittement: '',
      complementsInformations: '',
      refService: '',
      objet: '',
      logfile_id: null,
      demande_id: props.demandeId
    }
    await patternStore.fetchPatterns()
  } catch (error) {
    console.error('Erreur lors de la création du pattern:', error)
  }
}

patternStore.fetchPatterns()
enumStore.fetchAllEnums()
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Ajouter un Logfile Pattern</h3>
    <form class="space-y-4" @submit.prevent="submitForm">
      <div>
        <label class="block text-sm font-medium">Numéro Référence</label>
        <input
          v-model.number="form.nRef"
          type="number"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
        >
      </div>
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
        <label class="block text-sm font-medium">Signification</label>
        <input
          v-model="form.signification"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Identification</label>
        <input
          v-model="form.identification"
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
        <label class="block text-sm font-medium">Perform Action</label>
        <input
          v-model="form.performAction"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Acquittement</label>
        <input
          v-model="form.acquittement"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
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
        <label class="block text-sm font-medium">Logfile ID</label>
        <input
          v-model.number="form.logfile_id"
          type="number"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <UiButton type="submit" :disabled="patternStore.loading || !demandeId">
          Ajouter le Pattern
        </UiButton>
      </div>
    </form>

    <div v-if="demandeId" class="mt-6">
      <h4 class="text-md font-medium mb-2">Patterns associés à la demande</h4>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700">
            <th class="border p-2">Référence</th>
            <th class="border p-2">Signification</th>
            <th class="border p-2">Message Alarme</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="pattern in patternStore.patternsByDemande(demandeId)"
            :key="pattern.id"
            class="border-b"
          >
            <td class="border p-2">{{ pattern.ref }}</td>
            <td class="border p-2">{{ pattern.signification }}</td>
            <td class="border p-2">{{ pattern.messageAlarme }}</td>
            <td class="border p-2">
              <UiButton
                size="sm"
                variant="destructive"
                @click="patternStore.deletePattern(pattern.id)"
              >
                Supprimer
              </UiButton>
            </td>
          </tr>
          <tr v-if="!patternStore.patternsByDemande(demandeId).length">
            <td colspan="4" class="text-center p-4">Aucun pattern associé</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>