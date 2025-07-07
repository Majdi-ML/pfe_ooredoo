import { defineStore } from 'pinia';
import axios from 'axios';
import Pusher, { Channel } from 'pusher-js';
import type { Message } from '../interfaces/Message';
import { useUserStore } from './user.store';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Message[],
    inputMessage: '',
    isLoading: false,
    error: null as string | null,
    isOpen: false,
    pusher: null as Pusher | null,
    channel: null as Channel | null,
    currentDiscussionId: null as number | null,
    connectionRetries: 0,
    maxRetries: 3,
    authRetries: 0,
    maxAuthRetries: 2,
    isInitializing: false, // Prevent multiple simultaneous initializations
  }),

  actions: {
    async initializeChat(discussionId: number) {
      // Prevent multiple simultaneous initializations
      if (this.isInitializing) {
        console.log('Chat initialization already in progress');
        return false;
      }

      this.isInitializing = true;
      
      try {
        const userStore = useUserStore();
        if (!userStore.isAuthenticated || !userStore.token) {
          try {
            await userStore.checkAuth();
            if (!userStore.token) {
              this.error = 'User not authenticated';
              return false;
            }
          } catch (error) {
            this.error = 'Authentication failed';
            return false;
          }
        }

        this.currentDiscussionId = discussionId;

        // Fresh CSRF token before any operations
        await this.refreshCsrfToken();

        if (!this.pusher) {
          await this.setupPusherConnection(userStore.token, discussionId);
        }

        await this.fetchMessages(discussionId);
        return true;
      } finally {
        this.isInitializing = false;
      }
    },

    async refreshCsrfToken() {
      try {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
          withCredentials: true,
        });
        // Wait a bit for the cookie to be set
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('CSRF Error:', error);
        this.error = 'CSRF token error';
        throw error;
      }
    },

    async setupPusherConnection(token: string, discussionId: number) {
      try {
        if (this.pusher) {
          this.pusher.disconnect();
          this.pusher = null;
        }

        // Ensure fresh CSRF token
        await this.refreshCsrfToken();

        const csrfToken = this.getCsrfToken();
        if (!csrfToken) {
          console.error('CSRF token not found after refresh');
          this.error = 'CSRF token not found';
          return;
        }

        console.log('Setting up Pusher with CSRF token:', csrfToken.substring(0, 10) + '...');

        this.pusher = new Pusher('tracwcnanpid9uorgtqa', {
          wsHost: 'localhost',
          wsPort: 8087,
          forceTLS: false,
          enabledTransports: ['ws'],
          disableStats: true,
          authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
          auth: {
            headers: {
              Authorization: `Bearer ${token}`,
              'X-XSRF-TOKEN': csrfToken,
              'X-CSRF-TOKEN': csrfToken, // Add this as fallback
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            params: {
              // Add CSRF token as param as well
              '_token': csrfToken,
            },
          },
          cluster: '',
        });

        this.setupConnectionHandlers(discussionId);
        this.channel = this.pusher.subscribe(`private-discussion.${discussionId}`);
        this.setupChannelHandlers();
      } catch (error) {
        console.error('Pusher initialization error:', error);
        this.error = 'Failed to initialize realtime connection';
        throw error;
      }
    },

    setupConnectionHandlers(discussionId: number) {
      if (!this.pusher) return;

      this.pusher.connection.bind('error', (error: any) => {
        console.error('Pusher connection error:', error);
        this.error = `WebSocket connection error: ${error.message || 'unknown'}`;
        if (this.connectionRetries < this.maxRetries && !this.isInitializing) {
          this.connectionRetries++;
          console.log(`Retrying connection (${this.connectionRetries}/${this.maxRetries})`);
          setTimeout(() => this.initializeChat(discussionId), 2000);
        } else {
          this.error = 'Failed to connect after multiple attempts';
        }
      });

      this.pusher.connection.bind('connected', () => {
        console.log('Pusher connected successfully');
        this.connectionRetries = 0;
        this.authRetries = 0;
        this.error = null;
      });

      this.pusher.connection.bind('disconnected', () => {
        console.log('Pusher disconnected, attempting to reconnect...');
        if (this.connectionRetries < this.maxRetries && !this.isInitializing) {
          this.connectionRetries++;
          setTimeout(() => this.initializeChat(discussionId), 2000);
        } else {
          this.error = 'Failed to reconnect WebSocket';
        }
      });

      this.pusher.connection.bind('state_change', (states: { previous: string; current: string }) => {
        console.log('Pusher state change:', states);
      });
    },

    setupChannelHandlers() {
      if (!this.channel) return;

      this.channel.bind('pusher:subscription_succeeded', () => {
        console.log(`Subscribed to channel ${this.channel?.name}`);
        this.authRetries = 0;
      });

      this.channel.bind('pusher:subscription_error', async (error: any) => {
        console.error('Subscription error:', error, 'Status:', error.status, 'Data:', error.data);
        this.error = `Subscription error: ${error.status || 'unknown'}`;
        
        if (error.status === 419 && this.authRetries < this.maxAuthRetries && !this.isInitializing) {
          this.authRetries++;
          console.log(`Retrying auth (${this.authRetries}/${this.maxAuthRetries})`);
          
          try {
            // Clean up current connection
            if (this.pusher) {
              this.pusher.disconnect();
              this.pusher = null;
              this.channel = null;
            }

            // Wait before retry
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Retry with fresh tokens
            await this.initializeChat(this.currentDiscussionId!);
          } catch (retryError) {
            console.error('Retry failed:', retryError);
            this.error = 'Authentication retry failed';
          }
        }
      });

      this.channel.bind('App\\Events\\MessageSent', (data: { message: Message }) => {
        this.handleNewMessage(data.message);
      });
    },

    getCsrfToken(): string {
      // Try multiple cookie names that Laravel might use
      const cookieNames = ['XSRF-TOKEN', 'laravel_session', 'laravel_token'];
      
      for (const cookieName of cookieNames) {
        const match = document.cookie.match(new RegExp(cookieName + '=([^;]+)'));
        if (match && match[1]) {
          const token = decodeURIComponent(match[1]);
          if (cookieName === 'XSRF-TOKEN') {
            return token;
          }
        }
      }

      // Fallback: check meta tag
      const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      if (metaToken) {
        return metaToken;
      }

      return '';
    },

    handleNewMessage(message: Message) {
      this.messages.push({
        ...message,
        user: {
          id: message.user_id,
          username: message.user?.username ?? 'Unknown',
          email: message.user?.email ?? '',
          role_id: 0,
          support_id: null,
        },
      });
      console.log('New message received:', message);
    },

    async fetchMessages(discussionId: number) {
      this.isLoading = true;
      this.error = null;
      try {
        await this.refreshCsrfToken();
        const response = await apiClient.get(`/discussions/${discussionId}/messages`, {
          headers: {
            Authorization: `Bearer ${useUserStore().token}`,
          },
        });
        this.messages = response.data.messages || [];
        console.log('Messages fetched:', this.messages);
      } catch (error: any) {
        console.error('Error fetching messages:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          url: `/discussions/${discussionId}/messages`,
        });
        this.error = error.response?.data?.message || `Error fetching messages: ${error.message}`;
      } finally {
        this.isLoading = false;
      }
    },

    async sendMessage(discussionId: number) {
      if (!this.inputMessage.trim()) return;
      this.isLoading = true;
      this.error = null;
      try {
        await this.refreshCsrfToken();
        const response = await apiClient.post(`/discussions/${discussionId}/messages`, {
          content: this.inputMessage,
        }, {
          headers: {
            Authorization: `Bearer ${useUserStore().token}`,
          },
        });
        this.messages.push(response.data.message);
        this.inputMessage = '';
        console.log('Message sent:', response.data.message);
      } catch (error: any) {
        console.error('Error sending message:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        this.error = error.response?.data?.message || `Error sending message: ${error.message}`;
      } finally {
        this.isLoading = false;
      }
    },

    openChat() {
      this.isOpen = true;
      if (this.currentDiscussionId && !this.messages.length) {
        this.fetchMessages(this.currentDiscussionId);
      }
    },

    closeChat() {
      this.isOpen = false;
      if (this.channel) {
        this.channel.unbind_all();
        this.pusher?.unsubscribe(`private-discussion.${this.currentDiscussionId}`);
        this.channel = null;
      }
      if (this.pusher) {
        this.pusher.disconnect();
        this.pusher = null;
      }
      // Reset retry counters
      this.connectionRetries = 0;
      this.authRetries = 0;
      this.isInitializing = false;
    },
  },
});