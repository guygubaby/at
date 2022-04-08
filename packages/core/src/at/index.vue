<template>
  <transition
    :css="false"
    type="animation"
    :mode="props.mode"
    :appear="props.appear"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @enter-cancelled="onEnterCancelled"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @leave-cancelled="onLeaveCancelled"
  >
    <slot />
  </transition>
</template>

<script lang="ts" setup>
import type { Fn } from '@vueuse/core'
import type { AnimateCssNames } from './misc'
import { animateCSS } from './utils'

interface Props {
  /**
   * Animation name from animate.css, default is ''
   */
  // name?: AnimateCssNames | '' // because of props can not use outer type, so use string instead
  name?: string
  /**
   * Enter animation name, default is `name`, higher property than `name` if set
   */
  // enterAnimate?: AnimateCssNames | ''
  enterAnimate?: string
  /**
   * Leave animation name, default is `name`, higher property than `name` if set
   */
  // leaveAnimate?: AnimateCssNames | ''
  leaveAnimate?: string
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
  mode?: 'out-in' | 'in-out'
  /**
   * If you also want to apply a transition on the initial render of a node
   *
   * you can add the appear attribute
   *
   * doc: https://vuejs.org/guide/built-ins/transition.html#transition-on-appear
   */
  appear?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits(['before-enter', 'enter', 'after-enter', 'enter-cancelled', 'leave', 'before-leave', 'after-leave', 'leave-cancelled'])

const onBeforeEnter = () => emit('before-enter')
const onAfterEnter = () => emit('after-enter')
const onEnterCancelled = () => emit('enter-cancelled')
const onBeforeLeave = () => emit('before-leave')
const onAfterLeave = () => emit('after-leave')
const onLeaveCancelled = () => emit('leave-cancelled')

const onEnter = (elem: HTMLElement, done: Fn) => {
  emit('enter')

  const { name, enterAnimate, duration, enterDuration, delay, enterDelay } = props
  const animation = (enterAnimate || name) as AnimateCssNames
  if (!animation) {
    done()
    onAfterEnter()
    return
  }

  animateCSS({
    elem,
    animation,
    duration: enterDuration || duration,
    delay: enterDelay || delay,
  }).then(() => {
    done()
    onAfterEnter()
  })
}

const onLeave = (elem: HTMLElement, done: Fn) => {
  emit('leave')

  const { name, leaveAnimate, duration, leaveDuration, delay, leaveDelay } = props
  const animation = (leaveAnimate || name) as AnimateCssNames
  if (!animation) {
    done()
    onAfterLeave()
    return
  }

  animateCSS({
    elem,
    animation,
    reverse: !leaveAnimate, // if leaveAnimate is not set, reverse is true
    duration: leaveDuration || duration,
    delay: leaveDelay || delay,
  }).then(() => {
    done()
    onAfterLeave()
  })
}
</script>
