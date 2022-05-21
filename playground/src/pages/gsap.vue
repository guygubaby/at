<template>
  <div>
    <Gt :variants="variants" appear>
      <p v-show="isShow">
        gsap transition
      </p>
    </Gt>

    <button class="btn" m="t-6" @click="toggle()">
      toggle
    </button>

    <div flex="~ col" m="t-20">
      <p v-if="isDirectiveShow" v-gsap="variants">
        gsap transition directive usage (now can only apply enter animate)
      </p>

      <div>
        <button class="btn" m="t-6" @click="toggleDirectiveShow()">
          toggle directive
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
import { Gt, defineDirective, defineVariants } from '@bryce-loskie/at/gsap'
import { useToggle } from '@vueuse/core'

/**
 * Using Gt component
 */
const variants = defineVariants({
  initial: {
    x: -100,
    opacity: 0,
  },
  enter: {
    x: 0,
    opacity: 1,
    onComplete(el: HTMLElement) {
      console.log('onComplete', el)
    },
  },
  leave: {
    x: 100,
    opacity: 0,
  },
})

const isShow = ref(true)
const toggle = useToggle(isShow)

/**
 * Using directive
 */
const vGsap = defineDirective()
const isDirectiveShow = ref(true)
const toggleDirectiveShow = useToggle(isDirectiveShow)
</script>
