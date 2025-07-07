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
          <Icon name="lucide:bot" class="h-8 w-8 text-primary" />
          <h3 class="text-xl font-semibold">Chatbot SQL Assistant</h3>
        </div>

        <div class="h-96 overflow-y-auto rounded-md border p-4">
          <div v-for="(message, index) in formattedMessages" :key="index" class="mb-4">
            <div
              :class="[
                'flex max-w-[90%] flex-col gap-2 rounded-lg px-4 py-2',
                message.role === 'user'
                  ? 'ml-auto bg-primary text-primary-foreground'
                  : 'mr-auto bg-muted'
              ]"
            >
              <div class="flex items-center gap-2">
                <span v-if="message.role === 'assistant'" class="font-medium">Assistant:</span>
                <span v-else class="font-medium">Vous:</span>
                <span class="text-xs text-muted-foreground">{{ message.timestamp }}</span>
              </div>
              <p class="whitespace-pre-wrap">{{ message.content }}</p>
              <p v-if="message.error" class="text-sm text-destructive">{{ message.error }}</p>
            </div>
          </div>
          <div v-if="isLoading" class="flex items-center gap-2 text-muted-foreground">
            <Icon name="lucide:loader-2" class="h-4 w-4 animate-spin" />
            <span>Assistant réfléchit...</span>
          </div>
        </div>

        <form @submit.prevent="sendMessage" class="flex gap-2">
          <UiInput
            v-model="inputMessage"
            placeholder="Posez votre question SQL ici..."
            class="flex-1"
            :disabled="isLoading"
          />
          <UiButton type="submit" :disabled="!inputMessage || isLoading">
            <Icon name="lucide:send" class="h-4 w-4" />
          </UiButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useChatbotStore } from '@/stores/chatbot.store'

const chatbotStore = useChatbotStore()

const {
  messagesbot: formattedMessages,
  inputMessage,
  isLoading,
  isOpen,
  error
} = storeToRefs(chatbotStore)

const { sendMessage, closeChat } = chatbotStore
</script>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>