<template>
  <div class="pt-4">
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des processus...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des processus : {{ error }}
    </div>
    <div v-else-if="data && data.length > 0">
      <UiDatatable 
        :data="data"
        :columns="columns"
        :options="tableOptions"
      />
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      Aucun processus associé à cette demande
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useProcessStore } from '~/stores/process.store'
import type { Process } from '~/interfaces/Process'

const props = defineProps<{ demandeId: number }>()
const processStore = useProcessStore()

onMounted(async () => {
  await processStore.fetchProcesses()
})

const data = computed(() => processStore.processesByDemande(props.demandeId))
const pending = computed(() => processStore.loading)
const error = computed(() => processStore.error)

const columns = [
  { data: 'ref', title: 'Référence' },
  { data: 'refComposant', title: 'Composant' },
  { data: 'process', title: 'Process' },
  { data: 'messageAlarme', title: 'Message Alarme' },
  { data: 'intervalleDePolling', title: 'Intervalle' },
  { data: 'objet', title: 'Objet' },
  { data: 'nomTemplate', title: 'Template' },
  { data: 'etat.nom', title: 'État' },
  { data: 'criticite.nom', title: 'Criticité' },
  { data: 'monitoredby.nom', title: 'Monitoré par' }
]

const tableOptions = {
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

if (error.value) {
  console.error('Erreur lors du chargement des logfiles:', error.value)
}
</script>