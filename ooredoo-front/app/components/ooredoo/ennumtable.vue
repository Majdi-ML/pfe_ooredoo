<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\EnnumTable.vue -->
<template>
  <div class="space-y-4">
    <!-- Dropdown to select enum table -->
    <div class="flex items-center justify-between">
      <UiSelect v-model="selectedEnum" @change="fetchSelectedEnum">
        <UiSelectTrigger>
          <UiSelectValue placeholder="Sélectionner une table enum" />
        </UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem v-for="enumOption in enumOptions" :key="enumOption.value" :value="enumOption.value">
            {{ enumOption.label }}
          </UiSelectItem>
        </UiSelectContent>
      </UiSelect>
      <UiButton v-if="selectedEnum" @click="openCreateModal">
        <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
        Ajouter
      </UiButton>
    </div>

    <!-- DataTable for selected enum -->
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des données...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des données : {{ error }}
    </div>
    <div v-else-if="currentData && currentData.length > 0">
      <UiDatatable :options="options" :columns="columns" :data="currentData">
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
              @click.stop="deleteRecord(cellData.id)"
            >
              Supprimer
            </UiButton>
          </div>
        </template>
      </UiDatatable>
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      Aucune donnée disponible pour {{ selectedEnum ? enumOptions.find(e => e.value === selectedEnum)?.label : 'cette table' }}
    </div>

    <!-- Modal for Create/Update -->
    <UiDialog v-model:open="isModalOpen">
      <UiDialogContent>
        <UiDialogHeader>
          <UiDialogTitle>{{ editMode ? 'Modifier' : 'Ajouter' }} {{ selectedEnum ? enumOptions.find(e => e.value === selectedEnum)?.label : '' }}</UiDialogTitle>
        </UiDialogHeader>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium">{{ nameFieldLabel }}</label>
            <UiInput v-model="formData[nameField]" placeholder="Entrez le nom" />
          </div>
        </div>
        <UiDialogFooter>
          <UiButton variant="outline" @click="isModalOpen = false">Annuler</UiButton>
          <UiButton @click="saveRecord">{{ editMode ? 'Mettre à jour' : 'Créer' }}</UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useEnumStore } from '~/stores/enumStore'
import type { Config, ConfigColumns } from 'datatables.net'

const enumStore = useEnumStore()

// Enum options for dropdown
const enumOptions = [
  { value: 'etats', label: 'États', nameField: 'nom' },
  { value: 'criticites', label: 'Criticités', nameField: 'nom' },
  { value: 'platformes', label: 'Plateformes', nameField: 'nom' },
  { value: 'typesServeurs', label: 'Types de Serveurs', nameField: 'nom' },
  { value: 'osList', label: 'OS', nameField: 'nom' },
  { value: 'soclesStandardOMU', label: 'Socles Standard OMU', nameField: 'nom' },
  { value: 'monitoredBys', label: 'Monitoré par', nameField: 'nom' },
  { value: 'versionsTechFirmware', label: 'Versions Tech Firmware', nameField: 'nom' },
  { value: 'versionsSNMP', label: 'Versions SNMP', nameField: 'nom' },
  { value: 'status', label: 'Statuts', nameField: 'nom' },
  { value: 'supports', label: 'Supports', nameField: 'support' },
  { value: 'roles', label: 'Rôles', nameField: 'role' },
]

// State
const selectedEnum = ref<string>('')
const isModalOpen = ref(false)
const editMode = ref(false)
const formData = ref<{ id?: number; nom?: string; support?: string; role?: string }>({})
const pending = computed(() => enumStore.loading)
const error = computed(() => enumStore.error)

// Compute current data based on selected enum
const currentData = computed(() => {
  if (!selectedEnum.value) return []
  return enumStore[selectedEnum.value as keyof typeof enumStore] as any[]
})

// Compute name field label and key
const nameField = computed(() => enumOptions.find(e => e.value === selectedEnum.value)?.nameField || 'nom')
const nameFieldLabel = computed(() => {
  const option = enumOptions.find(e => e.value === selectedEnum.value)
  return option ? option.label.split(' ').slice(-1)[0] : 'Nom'
})

// DataTable columns
const columns = computed<ConfigColumns[]>(() => [
  { data: 'id', title: 'ID' },
  { 
    data: nameField.value, 
    title: nameFieldLabel.value,
    render: (data) => data || '—'
  },
  {
    data: null,
    title: '',
    className: 'no-export',
    searchable: false,
    orderable: false,
    name: 'actions',
    render: '#actions',
    responsivePriority: 1,
  },
])

const options: Config = {
  buttons: [
    { extend: 'colvis', text: 'Colonnes', columns: ':not(.no-export)' },
    'copy', 'excel', 'pdf', 'print', 'csv',
  ],
  dom: "Q<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
  responsive: true,
  autoWidth: true,
  select: true,
}

// Methods
const fetchSelectedEnum = async () => {
  if (selectedEnum.value) {
    const fetchMethod = `fetch${selectedEnum.value.charAt(0).toUpperCase() + selectedEnum.value.slice(1)}` as keyof typeof enumStore
    await enumStore[fetchMethod]()
  }
}

const openCreateModal = () => {
  editMode.value = false
  formData.value = {}
  isModalOpen.value = true
}

const openEditModal = (record: any) => {
  editMode.value = true
  formData.value = { ...record }
  isModalOpen.value = true
}

const saveRecord = async () => {
  if (!selectedEnum.value) return
  try {
    if (editMode.value) {
      await enumStore[`update${selectedEnum.value.charAt(0).toUpperCase() + selectedEnum.value.slice(1)}` as keyof typeof enumStore](formData.value)
    } else {
      await enumStore[`create${selectedEnum.value.charAt(0).toUpperCase() + selectedEnum.value.slice(1)}` as keyof typeof enumStore](formData.value)
    }
    await fetchSelectedEnum()
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

const deleteRecord = async (id: number) => {
  if (!selectedEnum.value) return
  try {
    await enumStore[`delete${selectedEnum.value.charAt(0).toUpperCase() + selectedEnum.value.slice(1)}` as keyof typeof enumStore](id)
    await fetchSelectedEnum()
    useSonner('Succès', {
      description: 'Suppression effectuée avec succès',
    })
  } catch (error) {
    useSonner('Erreur', {
      description: 'Erreur lors de la suppression',
    })
  }
}

// Fetch all enums on mount
onMounted(() => {
  enumStore.fetchAllEnums()
})
</script>