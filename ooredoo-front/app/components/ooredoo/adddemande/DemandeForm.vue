<script setup lang="ts">
import { ref } from 'vue';
import { useDemandeStore } from '@/stores/demande.store';
import { useEnumStore } from '@/stores/enumStore';
import { useUserStore } from '@/stores/user.store'; // Import user store for dynamic user_id

defineProps<{ demandeId: number | null }>();
const emit = defineEmits(['created']);

const demandeStore = useDemandeStore();
const enumStore = useEnumStore();
const userStore = useUserStore();

// Dynamically get user_id from userStore
const userId = computed(() => userStore.currentUser?.id ?? 1); // Fallback to 1 if not available

const form = ref({
  description: '',
  status_id: 1, // Default to "Nouvelle"
  user_id: userId.value, // Use dynamic user_id
  serviceplatfom_id: null as number | null,
});

const submitForm = async () => {
  try {
    console.log('Envoi du formulaire:', form.value);
    const newDemande = await demandeStore.createDemande(form.value);
    emit('created', newDemande.id);
    form.value = { description: '', status_id: 1, user_id: userId.value, serviceplatfom_id: null };
  } catch (error) {
    console.error('Erreur lors de la création de la demande:', error);
  }
};

// Fetch enums on mount
onMounted(() => {
  enumStore.fetchAllEnums();
});
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">Créer une demande</h3>
    <form class="space-y-4" @submit.prevent="submitForm">
      <div>
        <label class="block text-sm font-medium">Description</label>
        <textarea
          v-model="form.description"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
          rows="4"
          required
        />
      </div>

      

      <div>
        <label class="block text-sm font-medium">Plateforme de service</label>
        <!-- Comment moved outside the tag -->
        <select
          v-model="form.serviceplatfom_id"
          class="w-full border rounded p-2 dark:bg-gray-700 dark:border-gray-600"
        >
          <option :value="null">Sélectionnez une plateforme</option>
          <option
            v-for="platform in enumStore.servicePlatformes"
            :key="platform.id"
            :value="platform.id"
          >
            {{ platform.nom }}
          </option>
        </select>
      </div>

      <div>
        <UiButton type="submit" :disabled="demandeStore.loading">
          Créer la demande
        </UiButton>
      </div>
    </form>
  </div>
</template>