<template>
  <div class="pt-4">
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des patterns logfiles...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des patterns logfiles : {{ error.message }}
    </div>
    <div v-else-if="data && data.length > 0">
      <UiDatatable 
        :data="data"
        :columns="columns"
        :options="tableOptions"
      />
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      Aucun pattern logfile associé à cette demande
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFetch } from '#imports'
import type { LogfilePattern } from '~/interfaces/LogfilePattern'

const props = defineProps<{ demandeId: number }>()

const { data, pending, error } = useFetch<LogfilePattern[]>(`/api/logfilespatterns`, {
  method: 'get',
  query: { demande_id: props.demandeId, include: 'etat,criticite,logfile' }
})

const columns = [
  { data: 'id', title: 'ID' },
  { data: 'nRef', title: 'N° Réf' },
  { data: 'ref', title: 'Référence' },
  { data: 'etat_id', title: 'État ID' },
  { data: 'signification', title: 'Signification' },
  { data: 'identification', title: 'Identification' },
  { data: 'criticite_id', title: 'Criticité ID' },
  { data: 'messageAlarme', title: 'Message Alarme' },
  { data: 'instructions', title: 'Instructions' },
  { data: 'performAction', title: 'Action' },
  { data: 'acquittement', title: 'Acquittement' },
  { data: 'complementsInformations', title: 'Compléments' },
  { data: 'refService', title: 'Service' },
  { data: 'objet', title: 'Objet' },
  { data: 'logfile_id', title: 'Logfile ID' },
  { data: 'demande_id', title: 'Demande ID' },
  { data: 'etat.nom', title: 'État' },
  { data: 'criticite.nom', title: 'Criticité' },
  { data: 'logfile.logfile', title: 'Logfile' }
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
  console.error('Erreur lors du chargement des patterns logfiles:', error.value)
}
</script>