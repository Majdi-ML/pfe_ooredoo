<script setup lang="ts">
import { useRouter } from 'vue-router'
import UiRetroGrid from '../components/Ui/RetroGrid.vue'
import ThemePopOver from '../components/ThemePopover.vue' // Importez votre composant

const router = useRouter()
const colorMode = useColorMode() // Utilisez le colorMode si nécessaire

const goToDashboard = () => router.push('/examples/dashboard')
const goToSignIn = () => router.push('/login')

// Optionnel: fonction pour basculer manuellement
const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <!-- Background Grid -->
  <UiRetroGrid />

  <!-- Wrapper Container for Centering -->
  <div class="relative z-10 min-h-screen flex items-center justify-center px-4">
    <!-- Bouton de bascule en haut à droite -->
    <div class="absolute top-4 right-4">
      <!-- Solution 1: Utilisez votre ThemePopOver existant -->
      <ThemePopOver />
      
      <!-- Solution alternative 2: Bouton simple si vous préférez -->
      <!--
      <button
        @click="toggleDarkMode"
        class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <Icon 
          :name="colorMode.value === 'dark' ? 'lucide:sun' : 'lucide:moon'" 
          class="h-5 w-5" 
        />
      </button>
      -->
    </div>
    
    <div class="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-12 py-20">
      <!-- Left: Title and Buttons -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left gap-8 md:w-1/2">
        <h1 class="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] text-transparent bg-clip-text">
          welcome
        </h1>

        <div class="flex flex-col sm:flex-row gap-4">
          <UiButton size="lg" @click="goToSignIn">Sign In</UiButton>
          <UiButton size="lg" @click="goToDashboard">Go To Dashboard</UiButton>
        </div>
      </div>

      <!-- Right: Image -->
      <div class="w-full md:w-1/2 flex items-center justify-center">
        <img
           src="/Ooredoo-Logo_CMYK_On-White-BG_FA-0.png"
          alt="Company Logo"
          class="w-full max-w-sm object-contain"
          style="min-width: 400px; max-height: 300px;"
        >
      </div>
    </div>
  </div>
</template>