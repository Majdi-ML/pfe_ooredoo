<template>
  <div class="pt-4">
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des traps SNMP...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des traps SNM : {{ error }}
    </div>
    <div v-else-if="data && data.length > 0">
      <UiDatatable 
        :data="data"
        :columns="columns"
        :options="tableOptions"
      />
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      Aucun trap SNMP associé à cette demande
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useTrapSnmpStore } from '~/stores/trapSnmp.store'
import type { TrapSnmp } from '~/interfaces/TrapSnmp'

const props = defineProps<{ demandeId: number }>()
const trapSnmpStore = useTrapSnmpStore()

onMounted(async () => {
  await trapSnmpStore.fetchTraps()
})

const data = computed(() => trapSnmpStore.trapsByDemande(props.demandeId))
const pending = computed(() => trapSnmpStore.loading)
const error = computed(() => trapSnmpStore.error)

const columns = [
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
  { data: 'version_snmp.nom', title: 'Version SNMP' }
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
  console.error('Erreur lors du chargement des traps SNMP:', error.value)
}
</script>