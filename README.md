# at

[![NPM version](https://img.shields.io/npm/v/@bryce-loskie/at?color=a1b858&label=)](https://www.npmjs.com/package/@bryce-loskie/at)

animate.css powered vue transition component

## Get Started

```bash
pnpm i @bryce-loskie/at
```

## Example

```html
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
```

[index.vue](https://github.com/guygubaby/at/blob/main/playground/src/pages/index.vue)

## License

[MIT](./LICENSE) License © 2022 [guygubaby](https://github.com/guygubaby)
