<template>
  <div class="pt-4">
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des clusters...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des clusters : {{ error }}
    </div>
    <div v-else-if="data && data.length > 0">
      <UiDatatable 
        :data="data"
        :columns="columns"
        :options="tableOptions"
      />
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      Aucun cluster associé à cette demande
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useClusterStore } from '~/stores/cluster.store'
import type { Cluster } from '~/interfaces/Cluster'

const props = defineProps<{ demandeId: number }>()
const clusterStore = useClusterStore()

onMounted(async () => {
  await clusterStore.fetchClusters()
})

const data = computed(() => clusterStore.clustersByDemande(props.demandeId))
const pending = computed(() => clusterStore.loading)
const error = computed(() => clusterStore.error)

const columns = [
  { data: 'id', title: 'ID' },
  { data: 'ref', title: 'Référence' },
  { data: 'etat_id', title: 'État ID' },
  { data: 'nomDuRessourceGroupPackageServiceGuard', title: 'Nom RGPSG' },
  { data: 'adresseIp', title: 'Adresse IP' },
  { data: 'listeDesServeursConcernes', title: 'Serveurs concernés' },
  { data: 'logicielCluster', title: 'Logiciel Cluster' },
  { data: 'version', title: 'Version' },
  { data: 'mode', title: 'Mode' },
  { data: 'serveurActif', title: 'Serveur actif' },
  { data: 'complementsInformations', title: 'Compléments' },
  { data: 'demande_id', title: 'Demande ID' },
  { data: 'etat.nom', title: 'État' }
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
  console.error('Erreur lors du chargement des clusters:', error.value)
}
</script>