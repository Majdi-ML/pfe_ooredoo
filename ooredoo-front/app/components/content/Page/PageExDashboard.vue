<!-- C:\Users\majdi\Desktop\Stage_pfe_ooredoo\ooredoo-front\app\components\content\Page\PageExDashboard.vue -->
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
              <UiButton
                v-if="isAdmin"
                variant="default"
                @click="chatbotStore.openChat"
              >
                <Icon name="lucide:message-square" class="mr-2 h-4 w-4" />
                Chatbot SQL
              </UiButton>
            </div>
          </div>

          <!-- Modal for CreateDemandeWizard -->
          <div v-if="isModalOpen">
            <CreateDemandeWizard @close="closeModal" @created="refreshDemands" />
          </div>

          <!-- Chatbot Modal -->
          <Chatbot />

          <!-- Tabs for page content -->
          <UiTabs default-value="overview" class="space-y-4">
            <UiTabsList>
              <template v-for="(t, i) in tabItems" :key="i">
                <UiTabsTrigger
                  :value="t.value"
                  :disabled="t.disabled"
                  v-if="!t.adminOnly || isAdmin"
                >
                  {{ t.title }}
                </UiTabsTrigger>
              </template>
            </UiTabsList>

            <UiTabsContent value="overview" class="space-y-4">
              <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <template v-for="(s, i) in statusCards" :key="i">
                  <UiCard>
                    <UiCardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                      <UiCardTitle class="text-sm font-medium">{{ s.title }}</UiCardTitle>
                      <Icon :name="s.icon" class="h-4 w-4 text-muted-foreground" />
                    </UiCardHeader>
                    <UiCardContent>
                      <div class="text-2xl font-bold">{{ s.amount }}</div>
                      <p class="text-xs text-muted-foreground">{{ s.subtext }}</p>
                    </UiCardContent>
                  </UiCard>
                </template>
              </div>
              <DataTableOoredoo />
            </UiTabsContent>
            <UiTabsContent value="clusters" class="space-y-4">
              <DataTableClusters />
            </UiTabsContent>
            <UiTabsContent value="logfiles" class="space-y-4">
              <DataTableLogFiles />
            </UiTabsContent>
            <UiTabsContent value="logfilepatterns" class="space-y-4">
              <DataTableLogFilesPatterns />
            </UiTabsContent>
            <UiTabsContent value="processes" class="space-y-4">
              <DataTableProcesses />
            </UiTabsContent>
            <UiTabsContent value="requetessql" class="space-y-4">
              <DataTableRequeteSql />
            </UiTabsContent>
            <UiTabsContent value="scripts" class="space-y-4">
              <DataTableScripts />
            </UiTabsContent>
            <UiTabsContent value="trapssnmp" class="space-y-4">
              <DataTableTrapsSnmp />
            </UiTabsContent>
            <UiTabsContent value="urls" class="space-y-4">
              <DataTableUrl />
            </UiTabsContent>
            <UiTabsContent value="utilisateurs" class="space-y-4">
              <ExamplesCardTeamMembers />
            </UiTabsContent>
            <UiTabsContent v-if="isAdmin" value="enums" class="space-y-4">
              <EnnumTable />
            </UiTabsContent>
          </UiTabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import { addDays, format } from 'date-fns'
import { useUserStore } from '~/stores/user.store'
import { useDemandeStore } from '~/stores/demande.store'
import { useClusterStore } from '~/stores/cluster.store'
import { useLogfileStore } from '~/stores/logfile.store'
import { useServeurStore } from '~/stores/serveur.store'
import { useChatbotStore } from '~/stores/chatbot.store'
import DataTableOoredoo from '~/components/ooredoo/DataTableOoredoo.vue'
import DataTableClusters from '~/components/ooredoo/DataTableClusters.vue'
import DataTableLogFiles from '~/components/ooredoo/DataTableLogFiles.vue'
import DataTableLogFilesPatterns from '~/components/ooredoo/DataTableLogFilesPatterns.vue'
import DataTableProcesses from '~/components/ooredoo/DataTableProcesses.vue'
import DataTableRequeteSql from '~/components/ooredoo/DataTableRequeteSql.vue'
import DataTableScripts from '~/components/ooredoo/DataTableScripts.vue'
import DataTableTrapsSnmp from '~/components/ooredoo/DataTableTrapsSnmps.vue'
import DataTableUrl from '~/components/ooredoo/DataTableUrl.vue'
import EnnumTable from '~/components/ooredoo/ennumtable.vue'
import ExamplesCardTeamMembers from '~/components/Examples/Card/TeamMembers.vue'
import CreateDemandeWizard from '~/components/ooredoo/adddemande/CreateDemandeWizard.vue'
import Chatbot from '~/components/ooredoo/chatbot/chatbot.vue'
import ExamplesDashboardHeader from '~/components/Examples/Dashboard/Header.vue'

definePageMeta({ layout: 'default' })
useSeoMeta({ title: 'Dashboard' })

const userStore = useUserStore()
const demandeStore = useDemandeStore()
const clusterStore = useClusterStore()
const logfileStore = useLogfileStore()
const serveurStore = useServeurStore()
const chatbotStore = useChatbotStore()
const isDemandeur = computed(() => userStore.isDemandeur)
const isAdmin = computed(() => userStore.isAdmin)

const isModalOpen = ref(false)
const openModal = () => {
  isModalOpen.value = true
}
const closeModal = async () => {
  await refreshDemands()
  isModalOpen.value = false
}

const refreshDemands = async () => {
  try {
    await demandeStore.fetchDemandes()
    console.log('Refreshed demands:', demandeStore.demandes)
  } catch (error) {
    console.error('Error refreshing demands:', error)
  }
}

const date = ref({
  start: new Date(),
  end: addDays(new Date(), 30),
})

const tabItems = [
  { title: 'Overview', value: 'overview', disabled: false, adminOnly: false },
  { title: 'Clusters', value: 'clusters', disabled: false, adminOnly: false },
  { title: 'LogFiles', value: 'logfiles', disabled: false, adminOnly: false },
  { title: 'LogFilePatterns', value: 'logfilepatterns', disabled: false, adminOnly: false },
  { title: 'Processes', value: 'processes', disabled: false, adminOnly: false },
  { title: 'Requetes Sql', value: 'requetessql', disabled: false, adminOnly: false },
  { title: 'Scripts', value: 'scripts', disabled: false, adminOnly: false },
  { title: 'Traps SNMP', value: 'trapssnmp', disabled: false, adminOnly: false },
  { title: 'Urls', value: 'urls', disabled: false, adminOnly: false },
  { title: 'Utilisateurs', value: 'utilisateurs', disabled: false, adminOnly: false },
  { title: 'Enums', value: 'enums', disabled: false, adminOnly: true },
]

const statusCards = [
  {
    title: 'Demandes Total',
    icon: 'lucide:dollar-sign',
    amount: computed(() => demandeStore.totalDemandes.toString()),
    subtext: 'Total des demandes',
  },
  {
    title: 'Serveurs',
    icon: 'lucide:users',
    amount: computed(() => serveurStore.totalServeurs.toString()),
    subtext: 'Total des serveurs',
  },
  {
    title: 'Log Files',
    icon: 'lucide:credit-card',
    amount: computed(() => logfileStore.totalLogfiles.toString()),
    subtext: 'Total des logfiles',
  },
  {
    title: 'Clusters',
    icon: 'lucide:activity',
    amount: computed(() => clusterStore.totalClusters.toString()),
    subtext: 'Total des clusters',
  },
]

// Chart setup (unchanged)
type DataRecord = { name: string; total: number }
const chart = ref<HTMLDivElement | null>(null)

onMounted(async () => {
  const XYContainer = (await import('@unovis/ts')).XYContainer
  const Axis = (await import('@unovis/ts')).Axis
  const GroupedBar = (await import('@unovis/ts')).GroupedBar
  const Tooltip = (await import('@unovis/ts')).Tooltip

  const tooltip = new Tooltip({
    horizontalPlacement: 'right',
    triggers: {
      [GroupedBar.selectors.bar]: (d: DataRecord) =>
        `<span class='text-sm font-medium'>${d.name}: ${new Intl.NumberFormat('en-US', {
          currency: 'USD',
          style: 'currency',
        }).format(d.total)}</span>`,
    },
  })
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
  ]

  const bar = new GroupedBar<DataRecord>({
    x: (d, i) => i,
    y: (d) => d.total,
    color: '#adfa1d',
    barPadding: 0.05,
    roundedCorners: 4,
  })
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
    )
  })
})
</script>