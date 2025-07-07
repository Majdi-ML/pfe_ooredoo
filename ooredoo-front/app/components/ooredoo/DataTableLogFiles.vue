<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\DataTableLogFiles.vue -->
<template>
  <div>
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des logfiles...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des logfiles : {{ error }}
    </div>
    <div v-else-if="data && data.length > 0">
      <UiDatatable :options="options" :columns="columns" :data="data">
        <template #actions="{ cellData }: { cellData: Logfile }">
          <div class="flex gap-2">
            <UiButton
              class="h-7 text-xs"
              size="sm"
              @click.stop="
                useSonner('Édition en cours...', {
                  description: `Vous éditez le logfile #${cellData?.id}.`,
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
      Aucun logfile disponible
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useLogfileStore } from '~/stores/logfile.store'
import type { Logfile } from '@/interfaces/Logfile'
import type { Config, ConfigColumns } from 'datatables.net'

const logfileStore = useLogfileStore()

onMounted(() => {
  logfileStore.fetchLogfiles()
})

const data = computed(() => logfileStore.logfiles)
const pending = computed(() => logfileStore.loading)
const error = computed(() => logfileStore.error)

const viewDetails = (logfileId: number) => {
  navigateTo(`/logfiles/${logfileId}`)
}

const columns: ConfigColumns[] = [
  { data: 'ref', title: 'Référence' },
  { data: 'refComposant', title: 'Composant' },
  { data: 'rgSgSiCluster', title: 'Cluster' },
  { data: 'logfile', title: 'Fichier' },
  { data: 'localisation', title: 'Localisation' },
  { data: 'description', title: 'Description' },
  { data: 'formatLogfile', title: 'Format' },
  { data: 'separateur', title: 'Séparateur' },
  { data: 'intervalleDePolling', title: 'Intervalle' },
  { data: 'fourniEnAnnexe', title: 'Annexe' },
  { data: 'refService', title: 'Service' },
  { data: 'nomTemplate', title: 'Template' },
  { data: 'logConditions', title: 'Conditions' },
  { data: 'etat.nom', title: 'État' },
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