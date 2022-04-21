<template>
  <main font-sans p="x-4 y-10" text="center gray-700 dark:gray-200">
    <router-view />
    <Footer />
  </main>
</template>

<script lang="ts" setup>
import { useHead } from '@vueuse/head'

useHead({
  title: 'Vue AT | Playground',
  meta: [
    {
      name: 'description',
      content: 'Vue AT Playground',
    },
  ],
})
</script>
