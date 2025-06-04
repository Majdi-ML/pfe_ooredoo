<template>
  <div class="flex flex-col min-h-screen">
    <main class="w-full max-w-7xl mx-auto px-4 py-10">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>

const route = useRoute()

const { data: page } = await useAsyncData(
  route.path,
  () => queryCollection("content").path(route.path).first(),
  { default: () => null }
)

const { data: navigation } = await useAsyncData(
  "navigation",
  () => queryCollectionNavigation("content", ["icon", "label", "links", "layout"]),
  { default: () => [] }
)

provide("navigation", navigation)
provide("page", page)
</script>
