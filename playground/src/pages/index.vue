<template>
  <div class="py-40">
    <AT v-bind="transitionOptions" @before-enter="handleBe" @enter="handleE" @after-enter="handleAe" @before-leave="handleBl" @leave="handleL" @after-leave="handleAl">
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
  enterDuration: 3 * 1000,
})

const isShow = ref(true)
const toggle = useToggle(isShow)

const handleBe = () => {
  console.log('before enter')
}

const handleE = () => {
  console.log('enter')
}

const handleAe = () => {
  console.log('after enter')
}

const handleBl = () => {
  console.log('before leave')
}

const handleL = () => {
  console.log('leave')
}

const handleAl = () => {
  console.log('after leave')
}
</script>
