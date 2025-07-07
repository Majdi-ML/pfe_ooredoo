<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\ooredoo\DataTableServeurs.vue -->
<template>
  <div>
    <div v-if="pending" class="text-center py-8 text-gray-500">
      Chargement des serveurs...
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      Erreur lors du chargement des serveurs : {{ error }}
    </div>
    <div v-else-if="data && data.length > 0">
      <UiDatatable :options="options" :columns="columns" :data="data">
        <template #actions="{ cellData }: { cellData: Serveur }">
          <div class="flex gap-2">
            <UiButton
              class="h-7 text-xs"
              size="sm"
              @click.stop="
                useSonner('Édition en cours...', {
                  description: `Vous éditez le serveur #${cellData?.id}.`,
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
      Aucun serveur disponible
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import { useServeurStore } from '~/stores/serveur.store'
import type { Serveur } from '@/interfaces/Serveur'
import type { Config, ConfigColumns } from 'datatables.net'

const serveurStore = useServeurStore()

onMounted(() => {
  serveurStore.fetchServeurs()
})

const data = computed(() => serveurStore.serveurs)
const pending = computed(() => serveurStore.loading)
const error = computed(() => serveurStore.error)

const viewDetails = (serveurId: number) => {
  navigateTo(`/serveurs/${serveurId}`)
}

const columns: ConfigColumns[] = [
  { data: 'ref', title: 'Référence' },
  { data: 'hostname', title: 'Hostname' },
  { data: 'fqdn', title: 'FQDN' },
  { data: 'modele', title: 'Modèle' },
  { data: 'cluster', title: 'Cluster' },
  { data: 'ipSource', title: 'IP Source' },
  { data: 'description', title: 'Description' },
  { data: 'complementsInformations', title: 'Compléments' },
  { data: 'etat.nom', title: 'État' },
  { data: 'platforme.nom', title: 'Plateforme' },
  { data: 'typeserveur.nom', title: 'Type Serveur' },
  { data: 'os.nom', title: 'OS' },
  { data: 'ver_tech_firmware.nom', title: 'Firmware' },
  { data: 'soclestandardomu.nom', title: 'Socle OMU' },
  { data: 'serviceplatfom.nom', title: 'Service Platform' },
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