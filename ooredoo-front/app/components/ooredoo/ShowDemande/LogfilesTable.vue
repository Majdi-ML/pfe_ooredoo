<template>
  <div class="pt-4">
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des logfiles...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des logfiles : {{ error }}
    </div>
    <div v-else-if="data && data.length > 0">
      <UiDatatable 
        :data="data"
        :columns="columns"
        :options="tableOptions"
      />
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      Aucun logfile associé à cette demande
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useLogfileStore } from '~/stores/logfile.store'
import type { Logfile } from '~/interfaces/Logfile'

const props = defineProps<{ demandeId: number }>()
const logfileStore = useLogfileStore()

onMounted(async () => {
  await logfileStore.fetchLogfiles()
})

const data = computed(() => logfileStore.logfilesByDemande(props.demandeId))
const pending = computed(() => logfileStore.loading)
const error = computed(() => logfileStore.error)

const columns = [
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