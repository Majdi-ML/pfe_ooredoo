<template>
  <div class="pt-4">
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des scripts...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des scripts : {{ error.message }}
    </div>
    <div v-else-if="data && data.length > 0">
      <UiDatatable 
        :data="data"
        :columns="columns"
        :options="tableOptions"
      />
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      Aucun script associé à cette demande
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFetch } from '#imports'
import type { Script } from '~/interfaces/Script'

const props = defineProps<{ demandeId: number }>()

const { data, pending, error } = useFetch<Script[]>(`/api/scripts`, {
  method: 'get',
  query: { demande_id: props.demandeId, include: 'etat,criticite,monitoredby' }
})

const columns = [
  { data: 'id', title: 'ID' },
  { data: 'ref', title: 'Référence' },
  { data: 'etat_id', title: 'État ID' },
  { data: 'refComposant', title: 'Composant' },
  { data: 'rgSgSiCluster', title: 'Cluster' },
  { data: 'script', title: 'Script' },
  { data: 'codeErreur', title: 'Code Erreur' },
  { data: 'criticite_id', title: 'Criticité ID' },
  { data: 'description', title: 'Description' },
  { data: 'instructions', title: 'Instructions' },
  { data: 'monitoredBy_id', title: 'Monitoré par ID' },
  { data: 'refService', title: 'Service' },
  { data: 'demande_id', title: 'Demande ID' },
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
  console.error('Erreur lors du chargement des scripts:', error.value)
}
</script>