<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="relative w-full max-w-2xl rounded-lg bg-background p-6 shadow-lg">
      <button
        class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        @click="closeChat"
      >
        <Icon name="lucide:x" class="h-5 w-5" />
        <span class="sr-only">Fermer</span>
      </button>

      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <Icon name="lucide:message-circle" class="h-8 w-8 text-primary" />
          <h3 class="text-xl font-semibold">Discussion #{{
            discussionId
          }}</h3>
        </div>

        <div v-if="!authStore.isAuthenticated" class="text-destructive">
          Veuillez vous connecter pour accéder au chat.
        </div>
        <div v-else>
          <div ref="chatContainer" class="h-96 overflow-y-auto rounded-md border p-4">
            <div v-if="isLoading" class="flex items-center gap-2 text-muted-foreground">
              <Icon name="lucide:loader-2" class="h-4 w-4 animate-spin" />
              <span>Chargement des messages...</span>
            </div>
            <div v-else-if="error" class="text-destructive">{{ error }}</div>
            <div v-else-if="!messages.length" class="text-muted-foreground">
              Aucun message pour le moment.
            </div>
            <div v-for="(message, index) in messages" :key="index" class="mb-4">
              <div
                :class="[
                  'flex max-w-[90%] flex-col gap-2 rounded-lg px-4 py-2',
                  message.user_id === authStore.user?.id
                    ? 'ml-auto bg-primary text-primary-foreground'
                    : 'mr-auto bg-muted'
                ]"
              >
                <div class="flex items-center gap-2">
                  <span class="font-medium">{{ message.user?.username ?? 'Utilisateur' }}:</span>
                  <span class="text-xs text-muted-foreground">{{ formatDate(message.created_at) }}</span>
                </div>
                <p class="whitespace-pre-wrap">{{ message.content }}</p>
              </div>
            </div>
          </div>

          <form @submit.prevent="sendMessage(discussionId)" class="flex gap-2">
            <UiInput
              v-model="inputMessage"
              placeholder="Écrire un message..."
              class="flex-1"
              :disabled="isLoading || !authStore.isAuthenticated"
            />
            <UiButton type="submit" :disabled="!inputMessage || isLoading || !authStore.isAuthenticated">
              <Icon name="lucide:send" class="h-4 w-4" />
            </UiButton>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useChatStore } from '@/stores/chat.store'
import { useUserStore } from '@/stores/user.store'
import { format } from 'date-fns'
import { fr as frLocale } from 'date-fns/locale'
import { ref, watch, nextTick, onMounted } from 'vue'

const props = defineProps<{
  discussionId: number
}>()

const chatStore = useChatStore()
const authStore = useUserStore()
const chatContainer = ref<HTMLElement | null>(null)

const { messages, inputMessage, isLoading, isOpen, error } = storeToRefs(chatStore)
const { sendMessage, closeChat } = chatStore

const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: frLocale })
}

watch(messages, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
})

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    await authStore.checkAuth().catch(() => {
      chatStore.error = 'Utilisateur non authentifié'
    })
  }
  if (authStore.isAuthenticated) {
    chatStore.initializeChat(props.discussionId)
  }
})
</script>

<style scoped>
.h-96 {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f3f4f6;
}
.h-96::-webkit-scrollbar {
  width: 8px;
}
.h-96::-webkit-scrollbar-track {
  background: #f3f4f6;
}
.h-96::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}
</style>