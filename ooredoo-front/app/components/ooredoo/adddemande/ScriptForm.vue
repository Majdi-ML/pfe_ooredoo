<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\adddemande\ScriptForm.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useScriptStore } from '@/stores/script.store'
import { useEnumStore } from '@/stores/enumStore'

const props = defineProps<{ demandeId: number | null }>()
const scriptStore = useScriptStore()
const enumStore = useEnumStore()

const form = ref({
  ref: '',
  etat_id: 1,
  refComposant: '',
  rgSgSiCluster: '',
  script: '',
  codeErreur: '',
  criticite_id: null as number | null,
  description: '',
  instructions: '',
  monitoredBy_id: null as number | null,
  refService: '',
  demande_id: null as number | null,
  serveurs_ids: null as number | null
})

const submitForm = async () => {
  if (!props.demandeId) return
  try {
    form.value.demande_id = props.demandeId
    await scriptStore.createScript(form.value)
    form.value = {
      ref: '',
      etat_id: 1,
      refComposant: '',
      rgSgSiCluster: '',
      script: '',
      codeErreur: '',
      criticite_id: null,
      description: '',
      instructions: '',
      monitoredBy_id: null,
      refService: '',
      demande_id: props.demandeId,
      serveurs_ids: null
    }
    await scriptStore.fetchScripts()
  } catch (error) {
    console.error('Erreur lors de la création du script:', error)
  }
}

scriptStore.fetchScripts()
enumStore.fetchAllEnums()
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Ajouter un Script</h3>
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
        <label class="block text-sm font-medium">Script</label>
        <textarea
          v-model="form.script"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          rows="4"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium">Code Erreur</label>
        <input
          v-model="form.codeErreur"
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
        <label class="block text-sm font-medium">Description</label>
        <textarea
          v-model="form.description"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          rows="4"
        />
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
        <label class="block text-sm font-medium">Référence Service</label>
        <input
          v-model="form.refService"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <UiButton type="submit" :disabled="scriptStore.loading || !demandeId">
          Ajouter le Script
        </UiButton>
      </div>
    </form>

    <div v-if="demandeId" class="mt-6">
      <h4 class="text-md font-medium mb-2">Scripts associés à la demande</h4>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700">
            <th class="border p-2">Référence</th>
            <th class="border p-2">Script</th>
            <th class="border p-2">Code Erreur</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="script in scriptStore.scriptsByDemande(demandeId)"
            :key="script.id"
            class="border-b"
          >
            <td class="border p-2">{{ script.ref }}</td>
            <td class="border p-2">{{ script.script }}</td>
            <td class="border p-2">{{ script.codeErreur }}</td>
            <td class="border p-2">
              <UiButton
                size="sm"
                variant="destructive"
                @click="scriptStore.deleteScript(script.id)"
              >
                Supprimer
              </UiButton>
            </td>
          </tr>
          <tr v-if="!scriptStore.scriptsByDemande(demandeId).length">
            <td colspan="4" class="text-center p-4">Aucun script associé</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>