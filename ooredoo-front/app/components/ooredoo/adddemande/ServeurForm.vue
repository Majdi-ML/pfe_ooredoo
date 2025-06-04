<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\adddemande\ServeurForm.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useServeurStore } from '@/stores/serveur.store'
import { useEnumStore } from '@/stores/enumStore'

const props = defineProps<{ demandeId: number | null }>()
const serveurStore = useServeurStore()
const enumStore = useEnumStore()

const form = ref({
  ref: '',
  etat_id: 1,
  platforme_id: null as number | null,
  hostname: '',
  fqdn: '',
  type_id: null as number | null,
  modele: '',
  os_id: null as number | null,
  verTechFirmware_id: null as number | null,
  cluster: '',
  ipSource: '',
  description: '',
  socleStandardOmu_id: null as number | null,
  complementsInformations: '',
  demande_id: null as number | null
})

const submitForm = async () => {
  if (!props.demandeId) return
  try {
    form.value.demande_id = props.demandeId
    await serveurStore.createServeur(form.value)
    form.value = {
      ref: '',
      etat_id: 1,
      platforme_id: null,
      hostname: '',
      fqdn: '',
      type_id: null,
      modele: '',
      os_id: null,
      verTechFirmware_id: null,
      cluster: '',
      ipSource: '',
      description: '',
      socleStandardOmu_id: null,
      complementsInformations: '',
      demande_id: props.demandeId
    }
    await serveurStore.fetchServeurs()
  } catch (error) {
    console.error('Erreur lors de la création du serveur:', error)
  }
}

serveurStore.fetchServeurs()
enumStore.fetchAllEnums()
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Ajouter un serveur</h3>
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
        <label class="block text-sm font-medium">Plateforme</label>
        <select
          v-model="form.platforme_id"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option v-for="platforme in enumStore.platformes" :key="platforme.id" :value="platforme.id">
            {{ platforme.nom }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium">Hostname</label>
        <input
          v-model="form.hostname"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
        >
      </div>
      <div>
        <label class="block text-sm font-medium">FQDN</label>
        <input
          v-model="form.fqdn"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">Type de serveur</label>
        <select
          v-model="form.type_id"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option v-for="type in enumStore.typesServeurs" :key="type.id" :value="type.id">
            {{ type.nom }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium">Modèle</label>
        <input
          v-model="form.modele"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">OS</label>
        <select
          v-model="form.os_id"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option v-for="os in enumStore.osList" :key="os.id" :value="os.id">
            {{ os.nom }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium">Version Tech Firmware</label>
        <select
          v-model="form.verTechFirmware_id"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
          <option v-for="version in enumStore.versionsTechFirmware" :key="version.id" :value="version.id">
            {{ version.nom }}
          </option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium">Cluster</label>
        <input
          v-model="form.cluster"
          type="text"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
      </div>
      <div>
        <label class="block text-sm font-medium">IP Source</label>
        <input
          v-model="form.ipSource"
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
        <label class="block text-sm font-medium">Socle Standard OMU</label>
        <select
          v-model="form.socleStandardOmu_id"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option v-for="socle in enumStore.soclesStandardOMU" :key="socle.id" :value="socle.id">
            {{ socle.nom }}
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
        <UiButton type="submit" :disabled="serveurStore.loading || !demandeId">
          Ajouter le serveur
        </UiButton>
      </div>
    </form>

    <div v-if="demandeId" class="mt-6">
      <h4 class="text-md font-medium mb-2">Serveurs associés à la demande</h4>
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700">
            <th class="border p-2">Référence</th>
            <th class="border p-2">Hostname</th>
            <th class="border p-2">IP Source</th>
            <th class="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="serveur in serveurStore.serveursByDemande(demandeId)"
            :key="serveur.id"
            class="border-b"
          >
            <td class="border p-2">{{ serveur.ref }}</td>
            <td class="border p-2">{{ serveur.hostname }}</td>
            <td class="border p-2">{{ serveur.ipSource }}</td>
            <td class="border p-2">
              <UiButton
                size="sm"
                variant="destructive"
                @click="serveurStore.deleteServeur(serveur.id)"
              >
                Supprimer
              </UiButton>
            </td>
          </tr>
          <tr v-if="!serveurStore.serveursByDemande(demandeId).length">
            <td colspan="4" class="text-center p-4">Aucun serveur associé</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>