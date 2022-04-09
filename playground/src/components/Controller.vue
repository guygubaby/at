<template>
  <div mt-8>
    <select v-model="enterAnimation" class="ring rounded ml-2 dark:text-black">
      <option v-for="item in animations" :key="item" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import type { AnimateCssNames } from '@bryce-loskie/at'
import { AnimateCssPresets } from '@bryce-loskie/at'

const animations = Object.keys(AnimateCssPresets)

const enterAnimation = ref<AnimateCssNames>('backInDown')

const emit = defineEmits(['on-change'])

watch(enterAnimation, (val) => {
  emit('on-change', val)
})
</script>
