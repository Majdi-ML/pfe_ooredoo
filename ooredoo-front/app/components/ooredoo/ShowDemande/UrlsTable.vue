<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\ShowDemande\UrlsTable.vue -->
<template>
  <div class="pt-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-medium">URLs pour la Demande {{ props.demandeId }}</h3>
      <UiButton @click="openCreateModal">
        <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
        Ajouter URL
      </UiButton>
    </div>
    <div v-if="urlStore.loading" class="text-center py-8 text-gray-500">
      Chargement des URLs...
    </div>
    <div v-else-if="urlStore.error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des URLs : {{ urlStore.error }}
    </div>
    <div v-else-if="filteredUrls.length > 0">
      <UiDatatable
        :data="filteredUrls"
        :columns="columns"
        :options="tableOptions"
      >
        <template #actions="{ cellData }">
          <div class="flex gap-2">
            <UiButton
              class="h-7 text-xs"
              size="sm"
              @click.stop="openEditModal(cellData)"
            >
              Éditer
            </UiButton>
            <UiButton
              class="h-7 text-xs"
              size="sm"
              variant="destructive"
              @click.stop="deleteUrl(cellData.id)"
            >
              Supprimer
            </UiButton>
          </div>
        </template>
      </UiDatatable>
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      Aucune URL associée à cette demande
    </div>

    <!-- Modal for Create/Update -->
    <UiDialog v-model:open="isModalOpen">
      <UiDialogContent>
        <UiDialogHeader>
          <UiDialogTitle>{{ editMode ? 'Modifier' : 'Ajouter' }} URL</UiDialogTitle>
        </UiDialogHeader>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium">Référence</label>
            <UiInput v-model="formData.ref" placeholder="Entrez la référence" />
          </div>
          <div>
            <label class="block text-sm font-medium">État</label>
            <UiSelect v-model="formData.etat_id">
              <UiSelectTrigger>
                <UiSelectValue placeholder="Sélectionner un état" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="etat in enumStore.etats" :key="etat.id" :value="etat.id">
                  {{ etat.nom }}
                </UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div>
            <label class="block text-sm font-medium">Composant</label>
            <UiInput v-model="formData.refComposant" placeholder="Entrez le composant" />
          </div>
          <div>
            <label class="block text-sm font-medium">Cluster</label>
            <UiInput v-model="formData.rgSgSiCluster" placeholder="Entrez le cluster" />
          </div>
          <div>
            <label class="block text-sm font-medium">URL</label>
            <UiInput v-model="formData.url" placeholder="Entrez l'URL" />
          </div>
          <div>
            <label class="block text-sm font-medium">Action</label>
            <UiInput v-model="formData.performAction" placeholder="Entrez l'action" />
          </div>
          <div>
            <label class="block text-sm font-medium">Criticité</label>
            <UiSelect v-model="formData.criticite_id">
              <UiSelectTrigger>
                <UiSelectValue placeholder="Sélectionner une criticité" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="criticite in enumStore.criticites" :key="criticite.id" :value="criticite.id">
                  {{ criticite.nom }}
                </UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div>
            <label class="block text-sm font-medium">Message Alarme</label>
            <UiInput v-model="formData.messageAlarme" placeholder="Entrez le message d'alarme" />
          </div>
          <div>
            <label class="block text-sm font-medium">Instructions</label>
            <UiInput v-model="formData.instructions" placeholder="Entrez les instructions" />
          </div>
          <div>
            <label class="block text-sm font-medium">Intervalle de Polling</label>
            <UiInput v-model="formData.intervalleDePolling" placeholder="Entrez l'intervalle" />
          </div>
          <div>
            <label class="block text-sm font-medium">Service</label>
            <UiInput v-model="formData.refService" placeholder="Entrez le service" />
          </div>
          <div>
            <label class="block text-sm font-medium">Objet</label>
            <UiInput v-model="formData.objet" placeholder="Entrez l'objet" />
          </div>
          <div>
            <label class="block text-sm font-medium">Monitoré par</label>
            <UiSelect v-model="formData.monitoredBy_id">
              <UiSelectTrigger>
                <UiSelectValue placeholder="Sélectionner un moniteur" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="monitoredBy in enumStore.monitoredBys" :key="monitoredBy.id" :value="monitoredBy.id">
                  {{ monitoredBy.nom }}
                </UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div>
            <label class="block text-sm font-medium">Template</label>
            <UiInput v-model="formData.nomTemplate" placeholder="Entrez le template" />
          </div>
          <div>
            <label class="block text-sm font-medium">Serveurs</label>
            <UiSelect v-model="formData.serveurs_ids" multiple>
              <UiSelectTrigger>
                <UiSelectValue placeholder="Sélectionner des serveurs" />
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="serveur in serveurStore.serveurs" :key="serveur.id" :value="serveur.id">
                  {{ serveur.nom }}
                </UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
        </div>
        <UiDialogFooter>
          <UiButton variant="outline" @click="isModalOpen = false">Annuler</UiButton>
          <UiButton @click="saveUrl">{{ editMode ? 'Mettre à jour' : 'Créer' }}</UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useUrlStore } from '~/stores/url.store'
import { useEnumStore } from '~/stores/enumStore'
import { useServeurStore } from '~/stores/serveur.store'
import type { Url, UrlCreatePayload } from '~/interfaces/Url'
import type { Config, ConfigColumns } from 'datatables.net'

const props = defineProps<{ demandeId: number }>()

const urlStore = useUrlStore()
const enumStore = useEnumStore()
const serveurStore = useServeurStore()

// State for modal and form
const isModalOpen = ref(false)
const editMode = ref(false)
const formData = ref<UrlCreatePayload>({
  ref: '',
  etat_id: null,
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
  serveurs_ids: []
})

// Computed property to filter URLs by demandeId
const filteredUrls = computed(() => urlStore.urlsByDemande(props.demandeId))

// DataTable columns
const columns: ConfigColumns[] = [
  { data: 'id', title: 'ID' },
  { data: 'ref', title: 'Référence', render: (data) => data || '—' },
  { 
    data: 'etat_id', 
    title: 'État', 
    render: (data, type, row) => enumStore.getEtatById(data)?.nom || '—'
  },
  { data: 'refComposant', title: 'Composant', render: (data) => data || '—' },
  { data: 'rgSgSiCluster', title: 'Cluster', render: (data) => data || '—' },
  { data: 'url', title: 'URL', render: (data) => data || '—' },
  { data: 'performAction', title: 'Action', render: (data) => data || '—' },
  { 
    data: 'criticite_id', 
    title: 'Criticité', 
    render: (data, type, row) => enumStore.getCriticiteById(data)?.nom || '—'
  },
  { data: 'messageAlarme', title: 'Message Alarme', render: (data) => data || '—' },
  { data: 'instructions', title: 'Instructions', render: (data) => data || '—' },
  { data: 'intervalleDePolling', title: 'Intervalle', render: (data) => data || '—' },
  { data: 'refService', title: 'Service', render: (data) => data || '—' },
  { data: 'objet', title: 'Objet', render: (data) => data || '—' },
  { 
    data: 'monitoredBy_id', 
    title: 'Monitoré par', 
    render: (data, type, row) => enumStore.getMonitoredByById(data)?.nom || '—'
  },
  { data: 'nomTemplate', title: 'Template', render: (data) => data || '—' },
  { data: 'demande_id', title: 'Demande ID' },
  {
    data: null,
    title: '',
    className: 'no-export',
    searchable: false,
    orderable: false,
    name: 'actions',
    render: '#actions',
    responsivePriority: 1,
  }
]

const tableOptions: Config = {
  dom: "Q<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
  buttons: [
    { extend: 'colvis', text: 'Colonnes', columns: ':not(.no-export)' },
    'copy', 'excel', 'pdf', 'print', 'csv'
  ],
  responsive: true,
  autoWidth: true,
  select: true,
  searching: true,
  paging: true,
  info: true
}

// Methods
const openCreateModal = () => {
  editMode.value = false
  formData.value = {
    ref: '',
    etat_id: null,
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
    serveurs_ids: []
  }
  isModalOpen.value = true
}

const openEditModal = (url: Url) => {
  editMode.value = true
  formData.value = { ...url, serveurs_ids: url.serveurs?.map(s => s.id) || [] }
  isModalOpen.value = true
}

const saveUrl = async () => {
  try {
    if (editMode.value) {
      await urlStore.updateUrl(formData.value as Url)
    } else {
      await urlStore.createUrl(formData.value)
    }
    await urlStore.fetchUrls()
    isModalOpen.value = false
    useSonner('Succès', {
      description: `${editMode.value ? 'Mise à jour' : 'Création'} effectuée avec succès`,
    })
  } catch (error) {
    useSonner('Erreur', {
      description: `Erreur lors de ${editMode.value ? 'la mise à jour' : 'la création'}`,
    })
  }
}

const deleteUrl = async (id: number) => {
  try {
    await urlStore.deleteUrl(id)
    useSonner('Succès', {
      description: 'Suppression effectuée avec succès',
    })
  } catch (error) {
    useSonner('Erreur', {
      description: 'Erreur lors de la suppression',
    })
  }
}

// Fetch data on mount
onMounted(async () => {
  await Promise.all([
    urlStore.fetchUrls(),
    enumStore.fetchAllEnums(),
    serveurStore.fetchServeurs()
  ])
})
</script>