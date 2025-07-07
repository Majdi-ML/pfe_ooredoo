<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\DataTableRequeteSql.vue -->
<template>
  <div>
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des requêtes SQL...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des requêtes SQL : {{ error }}
    </div>
    <div v-else-if="data && data.length > 0">
      <UiDatatable :options="options" :columns="columns" :data="data">
        <template #actions="{ cellData }: { cellData: RequeteSQL }">
          <div class="flex gap-2">
            <UiButton
              class="h-7 text-xs"
              size="sm"
              @click.stop="
                useSonner('Édition en cours...', {
                  description: `Vous éditez la requête SQL #${cellData?.id}.`,
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
      Aucune requête SQL disponible
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useRequeteSqlStore } from '~/stores/requeteSql.store'
import type { RequeteSQL } from '@/interfaces/RequeteSQL'
import type { Config, ConfigColumns } from 'datatables.net'

const requeteSqlStore = useRequeteSqlStore()

onMounted(() => {
  requeteSqlStore.fetchRequetes()
})

const data = computed(() => requeteSqlStore.requetes)
const pending = computed(() => requeteSqlStore.loading)
const error = computed(() => requeteSqlStore.error)

const viewDetails = (requeteId: number) => {
  navigateTo(`/requetessql/${requeteId}`)
}

const columns: ConfigColumns[] = [
  { data: 'ref', title: 'Référence' },
  { data: 'refComposant', title: 'Composant' },
  { data: 'rgSgSiCluster', title: 'Cluster' },
  { data: 'requeteSql', title: 'Requête SQL' },
  { data: 'usernameDbName', title: 'Utilisateur DB' },
  { data: 'resultatAttenduDeLaRequete', title: 'Résultat attendu' },
  { data: 'performAction', title: 'Action' },
  { data: 'messageAlarme', title: 'Message Alarme' },
  { data: 'instructions', title: 'Instructions' },
  { data: 'intervalleDePolling', title: 'Intervalle' },
  { data: 'refService', title: 'Service' },
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