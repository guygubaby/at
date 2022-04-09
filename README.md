# at

[![NPM version](https://img.shields.io/npm/v/@bryce-loskie/at?color=a1b858&label=)](https://www.npmjs.com/package/@bryce-loskie/at)

Animate.css powered vue transition lib

## Get Started

```bash
pnpm i @bryce-loskie/at
```

## Usage

### 1. Use `AT` transition component

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

### Full transition options

```typescript
// Come from official animate.css side
// For more: https://animate.style/
type AnimateCssNames = 'bounce' | 'etc....'

// Presets enum
enum AnimateCssPresets {
  'bounce' = 'bounce'
  'etc...'
}

interface Options {
  /**
   * Animation name from animate.css, default is ''
   */
  name?: AnimateCssNames
  /**
   * Enter animation name, default is `name`, higher property than `name` if set
   */
  enterAnimate?: AnimateCssNames
  /**
   * Leave animation name, default is `name`, higher property than `name` if set
   */
  leaveAnimate?: AnimateCssNames
  /**
   * Animation delay, default is 0
   */
  delay?: number
  /**
   * Enter animation delay, default is 0, higher property than `delay` if set
   */
  enterDelay?: number
  /**
   * Leave animation delay, defalt is 0, higher property than `delay` if set
   */
  leaveDelay?: number
  /**
   * Animation duration, default is 1*1000 ms
   */
  duration?: number
  /**
   * Enter animation duration, default is `duration`, higher property than `duration` if set
   */
  enterDuration?: number
  /**
   * Leave animation duration, default is `duration`, higher property than `duration` if set
   */
  leaveDuration?: number
  /**
   * Vue transition mode, default to undefined
   *
   * doc: https://vuejs.org/guide/built-ins/transition.html#transition-modes
   */
  mode?: TransitionProps['mode']
  /**
   * If you also want to apply a transition on the initial render of a node
   *
   * you can add the appear attribute
   *
   * doc: https://vuejs.org/guide/built-ins/transition.html#transition-on-appear
   */
  appear?: TransitionProps['appear']
}
```

## 2. Animate element manually

```html
<template>
  <div class="py-40">
    <button ref="buttonRef" class="btn">
      animte el directly
    </button>
  </div>
</template>

<script setup lang="ts">
import { animateElem } from '@bryce-loskie/at'

const buttonRef = ref()

onMounted(() => {
  animateElem({
    elem: buttonRef.value,
    animation: AnimateCssPresets.rotateIn,
    repeat: '2', // or infinite
    direction: 'alternate',
  })
})
</script>
```

## Full animateElem payload options

```typescript
type AnimateElemPayload = {
    elem: MaybeRef<HTMLElement>;
    animation: AnimateCssNames;
    duration?: number | undefined;
    delay?: number | undefined;
    repeat?: string | number | undefined;
    direction?: "reverse" | "normal" | "alternate" | "alternate-reverse" | "initial" | "inherit" | undefined;
}
```

[Real Example code](https://github.com/guygubaby/at/blob/main/playground/src/pages/index.vue)

## License

[MIT](./LICENSE) License © 2022 [guygubaby](https://github.com/guygubaby)
