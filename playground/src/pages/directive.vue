<template>
  <div>
    <div flex="~ col" p="y-50">
      <div>
        <button v-animate="'backInDown'" class="btn">
          directive
        </button>
      </div>
      <div m="t-4">
        <button v-animate="variants" class="btn">
          directive 2
        </button>
      </div>
    </div>

    <router-link class="icon-btn !outline-none mt-8" to="/">
      <div class="ring flex items-center px-2 py-1 rounded">
        <div i-carbon-arrow-left m="r-2" />
        <span>Back</span>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { defineDirective, defineVariants } from '@bryce-loskie/at'

const vAnimate = defineDirective()

const variants = defineVariants({
  animation: 'backInDown',
  delay: 500,
})
</script>
