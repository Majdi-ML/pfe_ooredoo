<template>
  <div class="pt-4">
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des serveurs...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des serveurs : {{ error.message }}
    </div>
    <div v-else-if="data && data.length > 0">
      <UiDatatable 
        :data="data"
        :columns="columns"
        :options="tableOptions"
      />
    </div>
    <div v-else class="text-center py-8 text-gray-500">
      Aucun serveur associé à cette demande
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFetch } from '#imports'
import type { Serveur } from '~/interfaces/Serveur'

const props = defineProps<{ demandeId: number }>()

const { data, pending, error } = useFetch<Serveur[]>(`/api/serveurs`, {
  method: 'get',
  query: { demande_id: props.demandeId, include: 'etat,platforme,typeserveur,os,ver_tech_firmware,soclestandardomu,serviceplatfom' }
})

const columns = [
  { data: 'id', title: 'ID' },
  { data: 'ref', title: 'Référence' },
  { data: 'etat_id', title: 'État ID' },
  { data: 'platforme_id', title: 'Plateforme ID' },
  { data: 'hostname', title: 'Hostname' },
  { data: 'fqdn', title: 'FQDN' },
  { data: 'type_id', title: 'Type ID' },
  { data: 'serviceplatfom_id', title: 'Service Platform ID' },
  { data: 'modele', title: 'Modèle' },
  { data: 'os_id', title: 'OS ID' },
  { data: 'verTechFirmware_id', title: 'Firmware ID' },
  { data: 'cluster', title: 'Cluster' },
  { data: 'ipSource', title: 'IP Source' },
  { data: 'description', title: 'Description' },
  { data: 'socleStandardOmu_id', title: 'Socle OMU ID' },
  { data: 'complementsInformations', title: 'Compléments' },
  { data: 'demande_id', title: 'Demande ID' },
  { data: 'etat.nom', title: 'État' },
  { data: 'platforme.nom', title: 'Plateforme' },
  { data: 'typeserveur.nom', title: 'Type Serveur' },
  { data: 'os.nom', title: 'OS' },
  { data: 'ver_tech_firmware.nom', title: 'Firmware' },
  { data: 'soclestandardomu.nom', title: 'Socle OMU' },
  { data: 'serviceplatfom.nom', title: 'Service Platform' }
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
  console.error('Erreur lors du chargement des serveurs:', error.value)
}
</script>