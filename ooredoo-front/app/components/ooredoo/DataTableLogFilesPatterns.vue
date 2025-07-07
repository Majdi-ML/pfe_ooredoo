<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\DataTableLogFilesPatterns.vue -->
<template>
  <div>
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des patterns logfiles...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des patterns logfiles : {{ error }}
    </div>
    <div v-else-if="data && data.length > 0">
      <UiDatatable :options="options" :columns="columns" :data="data">
        <template #actions="{ cellData }: { cellData: LogfilePattern }">
          <div class="flex gap-2">
            <UiButton
              class="h-7 text-xs"
              size="sm"
              @click.stop="
                useSonner('Édition en cours...', {
                  description: `Vous éditez le pattern logfile #${cellData?.id}.`,
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
      Aucun pattern logfile disponible
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useLogfilePatternStore } from '~/stores/logfilePattern.store'
import type { LogfilePattern } from '@/interfaces/LogfilePattern'
import type { Config, ConfigColumns } from 'datatables.net'

const logfilePatternStore = useLogfilePatternStore()

onMounted(() => {
  logfilePatternStore.fetchPatterns()
})

const data = computed(() => logfilePatternStore.patterns)
const pending = computed(() => logfilePatternStore.loading)
const error = computed(() => logfilePatternStore.error)

const viewDetails = (patternId: number) => {
  navigateTo(`/logfilespatterns/${patternId}`)
}

const columns: ConfigColumns[] = [
  { data: 'nRef', title: 'N° Réf' },
  { data: 'ref', title: 'Référence' },
  { data: 'signification', title: 'Signification' },
  { data: 'identification', title: 'Identification' },
  { data: 'messageAlarme', title: 'Message Alarme' },
  { data: 'instructions', title: 'Instructions' },
  { data: 'performAction', title: 'Action' },
  { data: 'acquittement', title: 'Acquittement' },
  { data: 'complementsInformations', title: 'Compléments' },
  { data: 'refService', title: 'Service' },
  { data: 'objet', title: 'Objet' },
  { data: 'etat.nom', title: 'État' },
  { data: 'criticite.nom', title: 'Criticité' },
  { data: 'logfile.logfile', title: 'Logfile' },
  { data: 'demande.ref', title: 'Demande' },
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