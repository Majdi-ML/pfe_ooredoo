<template>
  <div class="py-5 min-[1440px]:container max-[1440px]:px-4">
    <div class="rounded-md border bg-background shadow">
      <div class="flex flex-col">
        <ExamplesDashboardHeader />
        <div class="flex-1 space-y-4 p-8 pt-6">
          <div class="flex items-center justify-between space-y-2">
            <h2 class="text-3xl font-bold tracking-tight">Demande #{{
              demande?.id ?? 'Chargement'
            }}</h2>
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
            </div>
          </div>

          <!-- Bouton Retour et Bouton Avancer -->
          <div class="mb-6 flex items-center space-x-4">
            <UiButton variant="outline" @click="navigateTo('/examples/dashboard')">
              <Icon name="lucide:arrow-left" class="mr-2 h-4 w-4" />
              Retour
            </UiButton>
            <UiButton
              v-if="canAdvance"
              variant="default"
              @click="advanceDemande"
              :disabled="loading"
            >
              <Icon name="lucide:arrow-right" class="mr-2 h-4 w-4" />
              {{ nextStepLabel }}
            </UiButton>
          </div>

          <!-- Détails de la demande -->
          <div class="bg-white shadow rounded-lg p-6 mb-8" v-if="demande">
            <!-- Timeline du workflow (horizontale) -->
            <div class="mb-8">
              <h2 class="text-xl font-semibold mb-4">Progression du workflow</h2>
              <div class="relative">
                <div class="absolute w-full h-1 bg-gray-200 top-4 left-0"></div>
                <ul class="flex justify-between relative">
                  <li
                    v-for="(step, index) in workflowSteps"
                    :key="index"
                    class="relative flex flex-col items-center flex-1"
                  >
                    <div
                      class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10"
                      :class="getStepClass(step.id)"
                    >
                      <Icon
                        :name="step.id <= currentStatusId ? 'lucide:check' : 'lucide:circle'"
                        class="w-5 h-5"
                        :class="step.id <= currentStatusId ? 'text-white' : 'text-gray-400'"
                      />
                    </div>
                    <div class="mt-2 text-center">
                      <h3 class="text-sm font-medium">{{ step.label }}</h3>
                      <p class="text-xs text-gray-500" v-if="step.id === currentStatusId">
                        Statut actuel
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Grille des informations principales -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <h3 class="text-sm font-medium text-gray-500">Référence</h3>
                <p>{{ demande.ref }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Statut</h3>
                <p>{{ demande.status?.nom }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Plateforme</h3>
                <p>{{ demande.serviceplatfom?.nom ?? 'Non spécifié' }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Description</h3>
                <p>{{ demande.description }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Utilisateur</h3>
                <p>{{ demande.user?.username ?? 'Non assigné' }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Créé le</h3>
                <p>{{ formatDate(demande.created_at) }}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-500">Mis à jour le</h3>
                <p>{{ formatDate(demande.updated_at) }}</p>
              </div>
            </div>

            <!-- Onglets -->
            <UiTabs default-value="clusters" class="space-y-4">
              <UiTabsList>
                <template v-for="(tab, index) in tabs" :key="index">
                  <UiTabsTrigger
                    :value="tab.value"
                    class="px-3 py-1 whitespace-nowrap"
                    :disabled="!tab.hasData"
                  >
                    {{ tab.title }}
                    <span
                      v-if="tab.hasData"
                      class="ml-1 text-xs bg-gray-200 rounded-full px-2 py-0.5"
                    >
                      {{ tab.count }}
                    </span>
                  </UiTabsTrigger>
                </template>
              </UiTabsList>

              <UiTabsContent value="clusters">
                <ClustersTable :demande-id="demande.id" />
              </UiTabsContent>
              <UiTabsContent value="logfiles">
                <LogfilesTable :demande-id="demande.id" />
              </UiTabsContent>
              <UiTabsContent value="serveurs">
                <ServeursTable :demande-id="demande.id" />
              </UiTabsContent>
              <UiTabsContent value="processes">
                <ProcessesTable :demande-id="demande.id" />
              </UiTabsContent>
              <UiTabsContent value="requetes">
                <RequetesSqlTable :demande-id="demande.id" />
              </UiTabsContent>
              <UiTabsContent value="scripts">
                <ScriptsTable :demande-id="demande.id" />
              </UiTabsContent>
              <UiTabsContent value="traps Pamela">
                <TrapsSnmpTable :demande-id="demande.id" />
              </UiTabsContent>
              <UiTabsContent value="urls">
                <UrlsTable :demande-id="demande.id" />
              </UiTabsContent>
              <UiTabsContent value="logfilespatterns">
                <LogfilesPatternsTable :demande-id="demande.id" />
              </UiTabsContent>
            </UiTabs>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            Chargement de la demande...
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { useDemandeStore } from '~/stores/demande.store';
import { useUserStore } from '~/stores/user.store'; // Assuming this is where your auth store is
import { ref, computed } from 'vue';
import { onMounted } from 'vue';
import { addDays, format } from 'date-fns';
import type { Demande } from '~/interfaces/Demande';
import ClustersTable from '~/components/ooredoo/ShowDemande/ClustersTable.vue';
import LogfilesTable from '~/components/ooredoo/ShowDemande/LogfilesTable.vue';
import ServeursTable from '~/components/ooredoo/ShowDemande/ServeursTable.vue';
import ProcessesTable from '~/components/ooredoo/ShowDemande/ProcessesTable.vue';
import RequetesSqlTable from '~/components/ooredoo/ShowDemande/RequetesSqlTable.vue';
import ScriptsTable from '~/components/ooredoo/ShowDemande/ScriptsTable.vue';
import TrapsSnmpTable from '~/components/ooredoo/ShowDemande/TrapsSnmpTable.vue';
import UrlsTable from '~/components/ooredoo/ShowDemande/UrlsTable.vue';
import LogfilesPatternsTable from '~/components/ooredoo/ShowDemande/LogfilesPatternsTable.vue';

// Initialisation
const route = useRoute();
const router = useRouter();
const demandeStore = useDemandeStore();
const authStore = useUserStore(); // Auth store for role checks
const demande = ref<Demande | null>(null);
const loading = ref(false);

// Date picker setup
const date = ref({
  start: new Date(),
  end: addDays(new Date(), 30),
});

// Définition des étapes du workflow
const workflowSteps = [
  { id: 1, label: 'Nouvelle', statusName: 'new' },
  { id: 2, label: 'En validation', statusName: 'validation' },
  { id: 3, label: 'En traitement', statusName: 'en traitement' },
  { id: 4, label: 'Test', statusName: 'test' },
  { id: 5, label: 'Clôturée', statusName: 'cloturée' },
];

// Statut actuel
const currentStatusId = computed(() => demande.value?.status_id ?? 1);

// Rôles de l'utilisateur connecté
const isAdmin = computed(() => authStore.isAdmin);
const isDemandeur = computed(() => authStore.isDemandeur);

// Logique pour déterminer si l'utilisateur peut avancer
const canAdvance = computed(() => {
  if (!demande.value || currentStatusId.value >= 5) return false; // No advancement if closed
  const currentStep = workflowSteps.find(step => step.id === currentStatusId.value);
  if (!currentStep) return false;

  // Transition rules
  if (currentStep.statusName === 'new' && isAdmin.value) return true; // Nouvelle → En validation (Admin)
  if (currentStep.statusName === 'validation' && isAdmin.value) return true; // En validation → En traitement (Admin)
  if (currentStep.statusName === 'en traitement' && isAdmin.value) return true; // En traitement → Test (Admin)
  if (currentStep.statusName === 'test' && isDemandeur.value) return true; // Test → Clôturée (Demandeur)
  return false;
});

// Label du bouton pour la prochaine étape
const nextStepLabel = computed(() => {
  const nextStepId = currentStatusId.value + 1;
  const nextStep = workflowSteps.find(step => step.id === nextStepId);
  return nextStep ? `Avancer à "${nextStep.label}"` : '';
});

// Fonction pour avancer la demande
const advanceDemande = async () => {
  if (!demande.value || !canAdvance.value) return;
  loading.value = true;
  try {
    const nextStatusId = currentStatusId.value + 1;
    const updatedDemande = { ...demande.value, status_id: nextStatusId };
    await demandeStore.updateDemande(updatedDemande);
    demande.value = demandeStore.currentDemande; // Update local demande
  } catch (error) {
    console.error('Erreur lors de l\'avancement de la demande:', error);
    // Error handling is already managed in updateDemande
  } finally {
    loading.value = false;
  }
};

// Classes pour les étapes de la timeline
const getStepClass = (stepId: number) => {
  if (stepId < currentStatusId.value) return 'bg-green-500';
  if (stepId === currentStatusId.value) return 'bg-blue-500';
  return 'bg-gray-200';
};

// Formatage des dates
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Onglets avec compteurs
const tabs = [
  {
    value: 'clusters',
    title: 'Clusters',
    hasData: computed(() => (demande.value?.clusters?.length ?? 0) > 0),
    count: computed(() => demande.value?.clusters?.length ?? 0),
  },
  {
    value: 'logfiles',
    title: 'Logfiles',
    hasData: computed(() => (demande.value?.logfiles?.length ?? 0) > 0),
    count: computed(() => demande.value?.logfiles?.length ?? 0),
  },
  {
    value: 'serveurs',
    title: 'Serveurs',
    hasData: computed(() => (demande.value?.serveurs?.length ?? 0) > 0),
    count: computed(() => demande.value?.serveurs?.length ?? 0),
  },
  {
    value: 'processes',
    title: 'Processus',
    hasData: computed(() => (demande.value?.processes?.length ?? 0) > 0),
    count: computed(() => demande.value?.processes?.length ?? 0),
  },
  {
    value: 'requetes',
    title: 'Requêtes SQL',
    hasData: computed(() => (demande.value?.requetessqls?.length ?? 0) > 0),
    count: computed(() => demande.value?.requetessqls?.length ?? 0),
  },
  {
    value: 'scripts',
    title: 'Scripts',
    hasData: computed(() => (demande.value?.scripts?.length ?? 0) > 0),
    count: computed(() => demande.value?.scripts?.length ?? 0),
  },
  {
    value: 'traps',
    title: 'Traps SNMP',
    hasData: computed(() => (demande.value?.trapssnmps?.length ?? 0) > 0),
    count: computed(() => demande.value?.trapssnmps?.length ?? 0),
  },
  {
    value: 'urls',
    title: 'URLs',
    hasData: computed(() => (demande.value?.urls?.length ?? 0) > 0),
    count: computed(() => demande.value?.urls?.length ?? 0),
  },
  {
    value: 'logfilespatterns',
    title: 'Patterns Logfiles',
    hasData: computed(() => (demande.value?.logfilespatterns?.length ?? 0) > 0),
    count: computed(() => demande.value?.logfilespatterns?.length ?? 0),
  },
];

// Chargement des données
onMounted(async () => {
  const demandeId = Number(route.params.id);
  await demandeStore.fetchDemandeById(demandeId);
  demande.value = demandeStore.currentDemande;
  console.log('Demande chargée:', demande.value);
});

// Navigation
const navigateTo = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
/* Styles pour la timeline horizontale */
ul {
  position: relative;
}

li {
  min-width: 100px; /* Assure un espace minimum pour chaque étape */
}

@media (max-width: 640px) {
  ul {
    flex-wrap: wrap;
    gap: 1rem;
  }
  li {
    flex: 0 0 45%; /* Deux étapes par ligne sur petits écrans */
    min-width: 0;
  }
}
</style>