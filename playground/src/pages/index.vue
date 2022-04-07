<template>
  <div class="py-40">
    <AT v-bind="transitionOptions">
      <p v-if="isShow">
        Hi there
      </p>
    </AT>
    <button class="btn mt-10" @click="toggle()">
      toggle
    </button>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import AT, { AnimateCssPresets, defineOptions } from '@bryce-loskie/at'

const transitionOptions = defineOptions({
  appear: true,
  enterAnimate: AnimateCssPresets.backInDown,
  leaveAnimate: AnimateCssPresets.backOutUp,
  duration: 500,
})

const isShow = ref(true)
const toggle = useToggle(isShow)
</script>
