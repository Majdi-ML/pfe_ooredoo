<template>
  <div>
    <UiDatatable :options="options" :columns="columns" :data="demandes">
      <template #actions="{ cellData }: { cellData: Demande }">
        <div class="flex gap-2">
          <UiButton
            class="h-7 text-xs"
            size="sm"
            @click.stop="
              useSonner('Édition en cours...', {
                description: `Vous éditez la demande #${cellData?.id}.`,
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
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useDemandeStore } from '~/stores/demande.store'
import type { Demande } from '@/interfaces/Demande'
import type { Config, ConfigColumns } from 'datatables.net'

const demandeStore = useDemandeStore()
const demandes = demandeStore.demandes

// Charger les données au montage du composant
onMounted(() => {
  demandeStore.fetchDemandes()
})

const viewDetails = (demandeId: number) => {
  navigateTo(`/demandes/${demandeId}`)
}

const columns: ConfigColumns[] = [
  { data: 'id', title: 'ID' },
  { data: 'ref', title: 'Référence' },
  { data: 'description', title: 'Description' },
  { data: 'status.nom', title: 'Statut' }, // Vérifiez si 'status' existe dans les données
  {
    data: 'user',
    title: 'Utilisateur',
    render: function (data, type, row) {
      return data && data.username ? data.username : '—'
    }
  },
  { data: 'serviceplatfom.nom', title: 'Plateforme Service' }, // Vérifiez que 'serviceplatfom' est bien une relation
  { data: 'created_at', title: "Date d'ajout" },
  { data: 'updated_at', title: "Date de mise à jour" },
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
    {
      extend: 'colvis',
      text: 'Colonnes',
      columns: ':not(.no-export)',
    },
    'copy',
    'excel',
    'pdf',
    'print',
    'csv',
  ],
  dom: "Q<'flex flex-col lg:flex-row w-full lg:items-start lg:justify-between gap-5 mb-5'Bf><'border rounded-lg't><'flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between pt-3 p-5'li><''p>",
  responsive: true,
  autoWidth: true,
  select: true,
}
</script>
