<template>
  <div flex="~ col">
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
</template>

<script lang="ts" setup>
import { defineDirective, defineVariants } from '@bryce-loskie/at'

const vAnimate = defineDirective()

const variants = defineVariants({
  animation: 'backInDown',
  delay: 500,
})
</script>
