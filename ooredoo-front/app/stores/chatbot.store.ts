import { defineStore } from 'pinia';
import axios from 'axios';

interface Messagebot {
  timestamp: any;
  role: 'user' | 'assistant';
  content: string;
  error?: string;
}

export const useChatbotStore = defineStore('chatbot', {
  state: () => ({
    messagesbot: [] as Messagebot [],
    inputMessage: '',
    isLoading: false,
    isOpen: false,
    error: null as string | null,
  }),

  actions: {
    async sendMessage() {
      if (!this.inputMessage.trim() || this.isLoading) return;

      this.messagesbot.push({
        role: 'user',
        content: this.inputMessage,
      });
      this.inputMessage = '';
      this.isLoading = true;
      this.error = null;

      try {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
        const response = await axios.post('http://localhost:5000/ask', {
          question: this.messagesbot[this.messagesbot.length - 1]?.content ?? this.inputMessage,
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        this.messagesbot.push({
          role: 'assistant',
          content: `SQL: ${response.data.sql}\n\nRésultats: ${JSON.stringify(response.data.results, null, 2)}`,
        });
      } catch (error: any) {
        let errorMessage = 'Erreur de connexion au serveur';

        if (error.response) {
          errorMessage = error.response.data.error || errorMessage;
        } else if (error.request) {
          errorMessage = 'Le serveur ne répond pas';
        }

        this.messagesbot.push({
          role: 'assistant',
          content: errorMessage,
          error: error.message,
        });
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    openChat() {
      this.isOpen = true;
    },

    closeChat() {
      this.isOpen = false;
    },
  },

  getters: {
    formattedMessages: (state) => {
      return state.messagebots.map(msg => ({
        ...msg,
        timestamp: new Date().toLocaleTimeString(),
      }));
    },
  },
});