import { defineNuxtPlugin } from '#app'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtPlugin((nuxtApp) => {
  const userStore = useUserStore()
  userStore.initialize()
  console.log('Auth plugin initialized')
})