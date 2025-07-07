<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\DataTableTrapsSnmp.vue -->
<template>
  <div>
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des traps SNMP...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des traps SNMP : {{ error }}
    </div>
    <div v-else-if="data && data.length > 0">
      <UiDatatable :options="options" :columns="columns" :data="data">
        <template #actions="{ cellData }: { cellData: TrapSnmp }">
          <div class="flex gap-2">
            <UiButton
              class="h-7 text-xs"
              size="sm"
              @click.stop="
                useSonner('Édition en cours...', {
                  description: `Vous éditez le trap SNMP #${cellData?.id}.`,
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
      Aucun trap SNMP disponible
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useTrapSnmpStore } from '~/stores/trapSnmp.store'
import type { TrapSnmp } from '@/interfaces/TrapSnmp'
import type { Config, ConfigColumns } from 'datatables.net'

const trapSnmpStore = useTrapSnmpStore()

onMounted(() => {
  trapSnmpStore.fetchTraps()
})

const data = computed(() => trapSnmpStore.traps)
const pending = computed(() => trapSnmpStore.loading)
const error = computed(() => trapSnmpStore.error)

const viewDetails = (trapId: number) => {
  navigateTo(`/trapssnmp/${trapId}`)
}

const columns: ConfigColumns[] = [
  { data: 'ref', title: 'Référence' },
  { data: 'refComposant', title: 'Composant' },
  { data: 'signification', title: 'Signification' },
  { data: 'oid', title: 'OID' },
  { data: 'specificTrap', title: 'Trap spécifique' },
  { data: 'variableBinding', title: 'Variable Binding' },
  { data: 'messageAlarme', title: 'Message Alarme' },
  { data: 'instructions', title: 'Instructions' },
  { data: 'acquittement', title: 'Acquittement' },
  { data: 'mibAssocie', title: 'MIB associé' },
  { data: 'objet', title: 'Objet' },
  { data: 'compelementInformation', title: 'Information complémentaire' },
  { data: 'etat.nom', title: 'État' },
  { data: 'criticite.nom', title: 'Criticité' },
  { data: 'version_snmp.nom', title: 'Version SNMP' },
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