<template>
  <div class="pt-4">
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des requêtes SQL...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des requêtes SQL : {{ error }}
    </div>
    <div v-else-if="data && data.length > 0">
      <UiDatatable 
        :data="data"
        :columns="columns"
        :options="tableOptions"
      />
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      Aucune requête SQL associée à cette demande
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useRequeteSqlStore } from '~/stores/requeteSql.store'
import type { RequeteSQL } from '~/interfaces/RequeteSQL'

const props = defineProps<{ demandeId: number }>()
const requeteSqlStore = useRequeteSqlStore()

onMounted(async () => {
  await requeteSqlStore.fetchRequetes()
})

const data = computed(() => requeteSqlStore.requetesByDemande(props.demandeId))
const pending = computed(() => requeteSqlStore.loading)
const error = computed(() => requeteSqlStore.error)

const columns = [
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
  console.error('Erreur lors du chargement des requêtes SQL:', error.value)
}
</script>