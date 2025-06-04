<template>
  <UiRetroGrid />
  
  <!-- Wrapper Container for Centering -->
  <div class="relative z-10 min-h-screen flex items-center justify-center px-4">
    <!-- Bouton de bascule en haut à droite -->
    

    <div
      class="w-full max-w-[380px] bg-white dark:bg-gray-800 border border-border/60 px-8 py-5 shadow-sm dark:border-border min-[480px]:rounded-lg"
    >
      <div class="text-center">
        <img
          class="mx-auto h-23 w-auto"
          src="/Ooredoo-Logo_CMYK_On-White-BG_FA-0.png"
          alt="Ooredoo Logo"
        >
        <h1 class="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white lg:text-3xl">
          Connexion à votre compte
        </h1>
        <p class="mt-1 text-muted-foreground">Entrez votre nom d'utilisateur et mot de passe</p>
      </div>

      <form class="mt-10" @submit.prevent="handleLogin">
        <fieldset :disabled="loading" class="grid gap-5">
          <!-- Affichage des erreurs -->
          <div
            v-if="error"
            class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 px-4 py-3 rounded-md text-sm"
          >
            {{ error }}
          </div>

          <div>
            <UiVeeInput 
              label="Nom d'utilisateur" 
              type="text" 
              name="username" 
              v-model="credentials.username"
              placeholder="votre.nom"
              :disabled="loading"
            />
          </div>
          <div>
            <UiVeeInput 
              label="Mot de passe" 
              type="password" 
              name="password" 
              v-model="credentials.password"
              :disabled="loading"
            />
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600"
              >
              <label for="remember-me" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Se souvenir de moi
              </label>
            </div>
          </div>
          <div>
            <UiButton 
              class="w-full" 
              type="submit" 
              :disabled="loading"
            >
              <span v-if="loading">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion en cours...
              </span>
              <span v-else>
                Se connecter
              </span>
            </UiButton>
          </div>
        </fieldset>
      </form>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import type { LoginCredentials } from '~/interfaces/User'

useSeoMeta({
  title: "Connexion",
  description: "Entrez votre nom d'utilisateur et mot de passe pour vous connecter.",
});

const router = useRouter()
const userStore = useUserStore()

const credentials = ref<LoginCredentials>({
  username: '',
  password: ''
})

const error = ref<string | null>(null)
const loading = ref(false)

onMounted(async () => {
  // Rediriger si déjà connecté
  if (userStore.isAuthenticated) {
    router.push('/examples/dashboard')
    return
  }
  
  // Optionnel: Pré-charger le cookie CSRF
  
})

const handleLogin = async () => {
  error.value = null
  loading.value = true

  try {
    await userStore.login(credentials.value)
    useSonner("Connexion réussie!", {
      description: "Vous êtes maintenant connecté.",
    });
    router.push('/examples/dashboard')
  } catch (err: any) {
    error.value = err.message || 'Une erreur est survenue lors de la connexion'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>