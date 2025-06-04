<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\adddemande\RequeteSqlForm.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useRequeteSqlStore } from '@/stores/requeteSql.store'
import { useEnumStore } from '@/stores/enumStore'

const props = defineProps<{ demandeId: number | null }>()
const requeteStore = useRequeteSqlStore()
const enumStore = useEnumStore()

const form = ref({
  ref: '',
  etat_id: 1,
  refComposant: '',
  rgSgSiCluster: '',
  requeteSql: '',
  usernameDbName: '',
  resultatAttenduDeLaRequete: '',
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
    await requeteStore.createRequete(form.value)
    form.value = {
      ref: '',
      etat_id: 1,
      refComposant: '',
      rgSgSiCluster: '',
      requeteSql: '',
      usernameDbName: '',
      resultatAttenduDeLaRequete: '',
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
    await requeteStore.fetchRequetes()
  } catch (error) {
    console.error('Erreur lors de la création de la requête SQL:', error)
  }
}

requeteStore.fetchRequetes()
enumStore.fetchAllEnums()
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Ajouter une Requête SQL</h3>
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
        <label class="block text-sm font-medium">Requête SQL</label>
        <textarea
          v-model="form.requeteSql"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          rows="4"
          required
        />
      </div>
      <div>
        <label class="block text-sm font-medium">Username DB Name</label>
        <input
          v-model="form.usernameDbName"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Résultat Attendu</label>
        <input
          v-model="form.resultatAttenduDeLaRequete"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
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
        <UiButton type="submit" :disabled="requeteStore.loading || !demandeId">
          Ajouter la Requête SQL
        </UiButton>
      </div>
    </form>

    <div v-if="demandeId" class="mt-6">
      <h4 class="text-md font-medium mb-2">Requêtes SQL associées à la demande</h4>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700">
            <th class="border p-2">Référence</th>
            <th class="border p-2">Requête SQL</th>
            <th class="border p-2">Message Alarme</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="requete in requeteStore.requetesByDemande(demandeId)"
            :key="requete.id"
            class="border-b"
          >
            <td class="border p-2">{{ requete.ref }}</td>
            <td class="border p-2">{{ requete.requeteSql }}</td>
            <td class="border p-2">{{ requete.messageAlarme }}</td>
            <td class="border p-2">
              <UiButton
                size="sm"
                variant="destructive"
                @click="requeteStore.deleteRequete(requete.id)"
              >
                Supprimer
              </UiButton>
            </td>
          </tr>
          <tr v-if="!requeteStore.requetesByDemande(demandeId).length">
            <td colspan="4" class="text-center p-4">Aucune requête SQL associée</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>