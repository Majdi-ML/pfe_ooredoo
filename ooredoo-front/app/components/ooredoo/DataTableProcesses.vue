<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\DataTableProcesses.vue -->
<template>
  <div>
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des processus...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des processus : {{ error }}
    </div>
    <div v-else-if="data && data.length > 0">
      <UiDatatable :options="options" :columns="columns" :data="data">
        <template #actions="{ cellData }: { cellData: Process }">
          <div class="flex gap-2">
            <UiButton
              class="h-7 text-xs"
              size="sm"
              @click.stop="
                useSonner('Édition en cours...', {
                  description: `Vous éditez le processus #${cellData?.id}.`,
                })
              "
            >
              Éditer
            </UiButton>
            <UiButton
              class="h-7 text-xs"
              size="sm"
              variant="outline"
              @click.stop="viewDetails(cellData.id)"
            >
              Afficher détails
            </UiButton>
          </div>
        </template>
      </UiDatatable>
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      Aucun processus disponible
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useProcessStore } from '~/stores/process.store'
import type { Process } from '@/interfaces/Process'
import type { Config, ConfigColumns } from 'datatables.net'

const processStore = useProcessStore()

onMounted(() => {
  processStore.fetchProcesses()
})

const data = computed(() => processStore.processes)
const pending = computed(() => processStore.loading)
const error = computed(() => processStore.error)

const viewDetails = (processId: number) => {
  navigateTo(`/processes/${processId}`)
}

const columns: ConfigColumns[] = [
  { data: 'ref', title: 'Référence' },
  { data: 'refComposant', title: 'Composant' },
  { data: 'process', title: 'Processus' },
  { data: 'messageAlarme', title: 'Message Alarme' },
  { data: 'intervalleDePolling', title: 'Intervalle' },
  { data: 'objet', title: 'Objet' },
  { data: 'nomTemplate', title: 'Template' },
  { data: 'etat.nom', title: 'État' },
  { data: 'criticite.nom', title: 'Criticité' },
  { data: 'monitoredby.nom', title: 'Monitoré par' },
  { data: 'demande.ref', title: 'Demande' },
  {
    data: 'serveurs',
    title: 'Serveurs',
    render: (data) => data?.map((s: Serveur) => s.hostname).join(', ') || '—'
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
]

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
</script>