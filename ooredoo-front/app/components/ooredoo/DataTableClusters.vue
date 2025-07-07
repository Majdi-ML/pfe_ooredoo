<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\DataTableClusters.vue -->
<template>
  <div>
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des clusters...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des clusters : {{ error }}
    </div>
    <div v-else-if="data && data.length > 0">
      <UiDatatable :options="options" :columns="columns" :data="data">
        <template #actions="{ cellData }: { cellData: Cluster }">
          <div class="flex gap-2">
            <UiButton
              class="h-7 text-xs"
              size="sm"
              @click.stop="
                useSonner('Édition en cours...', {
                  description: `Vous éditez le cluster #${cellData?.id}.`,
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
      Aucun cluster disponible
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useClusterStore } from '~/stores/cluster.store'
import type { Cluster } from '@/interfaces/Cluster'
import type { Config, ConfigColumns } from 'datatables.net'

const clusterStore = useClusterStore()

// Charger les données au montage du composant
onMounted(() => {
  clusterStore.fetchClusters()
})

const data = computed(() => clusterStore.clusters)
const pending = computed(() => clusterStore.loading)
const error = computed(() => clusterStore.error)

const viewDetails = (clusterId: number) => {
  navigateTo(`/clusters/${clusterId}`)
}

const columns: ConfigColumns[] = [
  { data: 'ref', title: 'Référence' },
  { data: 'nomDuRessourceGroupPackageServiceGuard', title: 'Nom Ressource Group' },
  { data: 'adresseIp', title: 'Adresse IP' },
  { data: 'listeDesServeursConcernes', title: 'Serveurs Concernés' },
  { data: 'logicielCluster', title: 'Logiciel Cluster' },
  { data: 'version', title: 'Version' },
  { data: 'mode', title: 'Mode' },
  { data: 'serveurActif', title: 'Serveur Actif' },
  { data: 'complementsInformations', title: 'Compléments' },
  { data: 'etat.nom', title: 'État' },
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