<template>
  <header class="border-b" v-if="!loading">
    <div class="flex h-16 items-center px-4">
      <UiButton variant="outline" class="w-[200px] justify-between">
        <UiAvatar class="mr-2 h-5 w-5" :src="userAvatar" />
        {{ userName }}
        <Icon name="lucide:chevrons-up-down" class="ml-auto h-4 w-4 shrink-0 opacity-50" />
      </UiButton>

      <nav class="mx-6 flex items-center space-x-4 lg:space-x-6">
        <NuxtLink to="#" class="text-sm font-medium transition-colors hover:text-primary">
          Dashboard
        </NuxtLink>
        <NuxtLink
          to="#"
          class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        />
        <NuxtLink
          to="#"
          class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        />
        <NuxtLink
          to="#"
          class="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        />
      </nav>

      <div class="ml-auto flex items-center space-x-4">
        <UiInput type="search" placeholder="Search..." class="md:w-[100px] lg:w-[300px]" />
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiButton variant="ghost" class="relative h-8 w-8 rounded-full">
              <UiAvatar
                class="h-8 w-8"
                :src="userAvatar"
                :alt="userName"
                :fallback="userInitials"
              />
            </UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent class="w-56" align="end">
            <UiDropdownMenuLabel class="font-normal">
              <div class="flex flex-col space-y-1">
                <p class="text-sm font-medium leading-none">{{ userName }}</p>
                <p class="text-xs leading-none text-muted-foreground">{{ userEmail }}</p>
                <p class="text-xs leading-none text-muted-foreground">{{ userRole }}</p>
              </div>
            </UiDropdownMenuLabel>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuGroup>
              <UiDropdownMenuItem title="Profile" shortcut="⇧⌘P" />
              <UiDropdownMenuItem title="Billing" shortcut="⌘B" />
              <UiDropdownMenuItem title="Settings" shortcut="⌘S" />
              <UiDropdownMenuItem title="New Team" shortcut="⌘NT" />
            </UiDropdownMenuGroup>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem 
              title="Log out" 
              shortcut="⇧⌘Q" 
              @click="logout"
            />
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </div>
    </div>
  </header>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user.store';
import { onMounted, ref, computed } from 'vue';
import { navigateTo } from 'nuxt/app';

const userStore = useUserStore();
const loading = ref(true);

onMounted(async () => {
  try {
    await userStore.checkAuth();
    if (!userStore.isAuthenticated) {
      navigateTo('/login');
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    navigateTo('/login');
  } finally {
    loading.value = false;
  }
});

// Computed properties for user data
const userName = computed(() => userStore.user?.username || 'Majdi Melliti');
const userEmail = computed(() => userStore.user?.email || 'm@example.com');
const userAvatar = computed(() => `https://avatar.vercel.sh/${userStore.user?.username || 'default'}`);
const userInitials = computed(() => {
  if (!userStore.user?.username) return 'MM';
  const names = userStore.user.username.split(' ');
  return names.map(name => name[0]).join('').toUpperCase();
});
const userRole = computed(() => {
  if (userStore.isAdmin) return 'Admin';
  if (userStore.isDemandeur) return 'Demandeur';
  return 'Unknown';
});

// Logout method
const logout = async () => {
  try {
    await userStore.logout();
    navigateTo('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
</script>