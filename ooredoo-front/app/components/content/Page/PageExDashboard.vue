<template>
  <div class="py-5 min-[1440px]:container max-[1440px]:px-4">
    <div class="rounded-md border bg-background shadow">
      <div class="flex flex-col">
        <ExamplesDashboardHeader />
        <div class="flex-1 space-y-4 p-8 pt-6">
          <div class="flex items-center justify-between space-y-2">
            <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div class="flex items-center space-x-2">
              <div>
                <UiDatepicker v-model.range="date" :columns="2">
                  <template #default="{ togglePopover }">
                    <UiButton
                      variant="outline"
                      :class="['w-[260px] justify-start text-left']"
                      @click="togglePopover"
                    >
                      <Icon name="lucide:calendar" class="h-4 w-4" />
                      {{ format(date.start, 'MMM dd, yyyy') }} -
                      {{ format(date.end, 'MMM dd, yyyy') }}
                    </UiButton>
                  </template>
                </UiDatepicker>
              </div>
              <UiButton>Download</UiButton>
              <UiButton
                v-if="isDemandeur"
                variant="default"
                @click="openModal"
              >
                <Icon name="lucide:plus" class="mr-2 h-4 w-4" />
                Ajouter Demande
              </UiButton>
            </div>
          </div>

          <!-- Modal for CreateDemandeWizard -->
          <div v-if="isModalOpen">
            <CreateDemandeWizard @close="closeModal" @created="refreshDemands" />
          </div>

          <!-- Tabs for page content -->
          <UiTabs default-value="overview" class="space-y-4">
            <UiTabsList>
              <template v-for="(t, i) in tabItems" :key="i">
                <UiTabsTrigger :value="t.title.toLowerCase()" :disabled="t.disabled">{{
                  t.title
                }}</UiTabsTrigger>
              </template>
            </UiTabsList>

            <UiTabsContent value="overview" class="space-y-4">
              <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <template v-for="(s, i) in statusCards" :key="i">
                  <UiCard>
                    <UiCardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                      <UiCardTitle class="text-sm font-medium"> {{ s.title }} </UiCardTitle>
                      <Icon :name="s.icon" class="h-4 w-4 text-muted-foreground" />
                    </UiCardHeader>
                    <UiCardContent>
                      <div class="text-2xl font-bold">{{ s.amount }}</div>
                      <p class="text-xs text-muted-foreground">{{ s.subtext }}</p>
                    </UiCardContent>
                  </UiCard>
                </template>
              </div>
              <DatableOoredoo />
            </UiTabsContent>
            <UiTabsContent value="utilisateurs" class="space-y-4">
              <ExamplesCardTeamMembers />
            </UiTabsContent>
          </UiTabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, computed } from 'vue';
import { _colors } from '#tailwind-config/theme';
import { addDays, format } from 'date-fns';
import { useUserStore } from '~/stores/user.store';
import { useDemandeStore } from '~/stores/demande.store'; // Import demande store
import DatableOoredoo from '../../ooredoo/DataTableOoredoo.vue';
import ExamplesCardTeamMembers from '../../Examples/Card/TeamMembers.vue';
import CreateDemandeWizard from '../../ooredoo/adddemande/CreateDemandeWizard.vue';

definePageMeta({ layout: 'default' });
useSeoMeta({ title: 'Dashboard' });

// User store for role check
const userStore = useUserStore();
const demandeStore = useDemandeStore(); // Initialize demande store
const isDemandeur = computed(() => userStore.isDemandeur);

// Modal state
const isModalOpen = ref(false);
const openModal = () => {
  isModalOpen.value = true;
};
const closeModal = async () => {
  await refreshDemands(); // Refresh demands before closing
  isModalOpen.value = false;
};

// Refresh demands
const refreshDemands = async () => {
  try {
    await demandeStore.fetchDemandes();
    console.log('Refreshed demands:', demandeStore.demandes);
  } catch (error) {
    console.error('Error refreshing demands:', error);
  }
};

// Chart setup (unchanged)
type DataRecord = { name: string; total: number };
const chart = ref<HTMLDivElement | null>(null);

onMounted(async () => {
  const XYContainer = (await import('@unovis/ts')).XYContainer;
  const Axis = (await import('@unovis/ts')).Axis;
  const GroupedBar = (await import('@unovis/ts')).GroupedBar;
  const Tooltip = (await import('@unovis/ts')).Tooltip;

  const tooltip = new Tooltip({
    horizontalPlacement: 'right',
    triggers: {
      [GroupedBar.selectors.bar]: (d: DataRecord) =>
        `<span class='text-sm font-medium'>${d.name}: ${new Intl.NumberFormat('en-US', {
          currency: 'USD',
          style: 'currency',
        }).format(d.total)}</span>`,
    },
  });
  const data: DataRecord[] = [
    { name: 'Jan', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Feb', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Mar', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Apr', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'May', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Jun', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Jul', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Aug', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Sep', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Oct', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Nov', total: Math.floor(Math.random() * 5000) + 1000 },
    { name: 'Dec', total: Math.floor(Math.random() * 5000) + 1000 },
  ];

  const bar = new GroupedBar<DataRecord>({
    x: (d, i) => i,
    y: (d) => d.total,
    color: '#adfa1d',
    barPadding: 0.05,
    roundedCorners: 4,
  });
  await nextTick(() => {
    new XYContainer(
      chart.value!,
      {
        height: '100%',
        components: [bar],
        xAxis: new Axis<DataRecord>({
          tickFormat: (d, _, __) => data[d as number].name,
          numTicks: data.length,
          gridLine: false,
          domainLine: false,
          tickLine: false,
        }),
        yAxis: new Axis<DataRecord>({
          gridLine: false,
          tickLine: false,
          domainLine: false,
        }),
        tooltip,
      },
      data
    );
  });
});

const date = ref({
  start: new Date(),
  end: addDays(new Date(), 30),
});

const tabItems = [
  { title: 'Overview', disabled: false },
  { title: 'LogFiles', disabled: false },
  { title: 'Process', disabled: false },
  { title: 'Serveurs', disabled: false },
  { title: 'Utilisateurs', disabled: false },
  { title: 'Services Platfom', disabled: false },
  { title: 'Requetes Sql', disabled: false },
  { title: 'Scripts', disabled: false },
];

const statusCards = [
  {
    title: 'Demandes Total',
    icon: 'lucide:dollar-sign',
    amount: '100',
    subtext: '+20.1% du mois dernier',
  },
  {
    title: 'Serveurs',
    icon: 'lucide:users',
    amount: '+2350',
    subtext: '+180.1% Ajouté',
  },
  {
    title: 'Log Files',
    icon: 'lucide:credit-card',
    amount: '+12,234',
    subtext: '+19% du mois dernier',
  },
  {
    title: 'Clusters',
    icon: 'lucide:activity',
    amount: '+573',
    subtext: '+201 du mois dernier',
  },
];

const recentSales = [
  {
    avatar: 'https://avatar.vercel.sh/oliviamartin',
    initials: 'OM',
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
  },
  {
    avatar: 'https://avatar.vercel.sh/jackson',
    initials: 'JL',
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
  },
  {
    avatar: 'https://avatar.vercel.sh/isabellanguyen',
    initials: 'IN',
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
  },
  {
    avatar: 'https://avatar.vercel.sh/williamkim',
    initials: 'WK',
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
  },
  {
    avatar: 'https://avatar.vercel.sh/sofiadavis',
    initials: 'SD',
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
  },
];
</script>