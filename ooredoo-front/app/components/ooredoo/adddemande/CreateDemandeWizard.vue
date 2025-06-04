<script setup lang="ts">
import { ref, computed } from 'vue';
import DemandeForm from './DemandeForm.vue';
import ClusterForm from './ClusterForm.vue';
import ServeurForm from './ServeurForm.vue';
import LogfileForm from './LogfileForm.vue';
import LogfilePatternForm from './LogfilePatternForm.vue';
import ProcessForm from './ProcessForm.vue';
import RequeteSqlForm from './RequeteSqlForm.vue';
import ScriptForm from './ScriptForm.vue';
import UrlForm from './UrlForm.vue';
import TrapSnmpForm from './TrapSnmpForm.vue';

const emit = defineEmits(['close']);
const activeTab = ref('Demande');
const demandeId = ref<number | null>(null);

// Liste des onglets
const tabs = [
  { name: 'Demande', component: DemandeForm },
  { name: 'Cluster', component: ClusterForm },
  { name: 'Serveur', component: ServeurForm },
  { name: 'Logfile', component: LogfileForm },
  { name: 'Logfile Pattern', component: LogfilePatternForm },
  { name: 'Process', component: ProcessForm },
  { name: 'Requete SQL', component: RequeteSqlForm },
  { name: 'Script', component: ScriptForm },
  { name: 'URL', component: UrlForm },
  { name: 'Trap SNMP', component: TrapSnmpForm },
];

// Computed property for active component
const activeComponent = computed(() => {
  const tab = tabs.find(tab => tab.name === activeTab.value);
  if (!tab) {
    console.error(`No component found for tab: ${activeTab.value}`);
    return null;
  }
  return tab.component;
});

// Gestion de la création de la demande
const handleDemandeCreated = (id: number) => {
  console.log('Demande created with ID:', id);
  demandeId.value = id;
};
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
      <!-- En-tête -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Créer une nouvelle demande</h2>
        <button class="text-gray-500 hover:text-gray-700" @click="emit('close')">
          <Icon name="lucide:x" class="h-6 w-6" />
        </button>
      </div>

      <!-- Onglets -->
      <div class="border-b border-gray-200 dark:border-gray-700">
        <nav class="flex -mb-px">
          <button
            v-for="tab in tabs"
            :key="tab.name"
            class="px-4 py-2 text-sm font-medium"
            :class="{
              'border-b-2 border-blue-500 text-blue-500': activeTab === tab.name,
              'text-gray-500 hover:text-gray-700': activeTab !== tab.name,
              'cursor-not-allowed opacity-50': tab.name !== 'Demande' && !demandeId,
            }"
            :disabled="tab.name !== 'Demande' && !demandeId"
            @click="activeTab = tab.name"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Contenu de l'onglet -->
      <div class="mt-6">
        <component
          v-if="activeComponent"
          :is="activeComponent"
          :demande-id="demandeId"
          @created="handleDemandeCreated"
        />
        <p v-else class="text-red-500">Erreur: Aucun composant valide pour l'onglet sélectionné.</p>
      </div>
    </div>
  </div>
</template>