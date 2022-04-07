<template>
  <transition
    :css="false"
    type="animation"
    :mode="props.mode"
    :appear="props.appear"
    @enter="onEnter"
    @leave="onLeave"
  >
    <slot />
  </transition>
</template>

<script lang="ts" setup>
import type { Fn, MaybeRef } from '@vueuse/core'
import { unref } from 'vue'
import type { AnimateCssNames } from './misc'
import { DEFAULT_DIRATION } from './misc'

interface Props {
  /**
   * Animation name from animate.css, default is ''
   */
  name?: AnimateCssNames | ''
  /**
   * Enter animation name, default is `name`, higher property than `name` if set
   */
  enterAnimate?: AnimateCssNames | ''
  /**
   * Leave animation name, default is `name`, higher property than `name` if set
   */
  leaveAnimate?: AnimateCssNames | ''
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

// props type does not support import from other files
const props = withDefaults(defineProps<Props>(), {
  mode: undefined,
  appear: false,

  name: '',
  enterAnimate: '',
  leaveAnimate: '',

  delay: 0,
  enterDelay: 0,
  leaveDelay: 0,

  duration: 1 * 1000,
  enterDuration: 1 * 1000,
  leaveDuration: 1 * 1000,
})

const emit = defineEmits(['enter', 'leave'])

/**
 * TODO:
 * 2. add enter/leave hooks
 */
interface AnimatePayload {
  elem: MaybeRef<HTMLElement>
  animation: AnimateCssNames
  reverse?: boolean
  delay?: number
  enterDelay?: number
  leaveDelay?: number
  duration?: number
  enterDuration?: number
  leaveDuration?: number
}

const addClass = (node: HTMLElement, ...clazz: string[]) => {
  node.classList.add(...clazz)
  node.style.animationPlayState = 'running'
  return () => {
    node.classList.remove(...clazz)
    node.style.animationPlayState = ''
  }
}

const setDuration = (node: HTMLElement, duration: number) => {
  node.style.setProperty('--animate-duration', `${duration}ms`)
  return () => node.style.removeProperty('--animate-duration')
}

const setDelay = (node: HTMLElement, delay: number) => {
  node.style.setProperty('--animate-delay', `${delay}ms`)
  return () => node.style.removeProperty('--animate-delay')
}

const setAnimateDirection = (node: HTMLElement, reverse: boolean) => {
  node.style.animationDirection = reverse ? 'reverse' : 'normal'
  return () => node.style.animationDirection = ''
}

const cleanups: Fn[] = []

const cleanSideEffects = () => {
  cleanups.forEach(fn => fn())
  cleanups.length = 0
}

const animateCSS = (payload: AnimatePayload) => {
  return new Promise<string>((resolve) => {
    const { elem, animation, reverse = false, duration = DEFAULT_DIRATION, enterDuration, leaveDuration, delay = 0, enterDelay, leaveDelay } = payload

    const node = unref(elem)
    if (!node) return resolve('elem is falsy')

    const prefix = 'animate__'

    const inDuration = enterDuration || duration
    const outDuration = leaveDuration || duration

    const inDelay = enterDelay || delay
    const outDelay = leaveDelay || delay

    const animationName = `${prefix}${animation}`
    const animatedName = `${prefix}animated`

    cleanups.push(
      setDuration(node, reverse ? outDuration : inDuration),
      setDelay(node, reverse ? outDelay : inDelay),
      setAnimateDirection(node, reverse),
      addClass(node, animatedName, animationName),
    )

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event: AnimationEvent) {
      event.stopPropagation()
      cleanSideEffects()
      resolve('Animation ended')
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true })
  })
}

const onEnter = (elem: HTMLElement, done: Fn) => {
  emit('enter')

  const { name, enterAnimate, enterDuration, enterDelay } = props
  const animation = enterAnimate || name
  if (!animation) return done()

  animateCSS({
    elem,
    animation,
    enterDuration,
    enterDelay,
  }).then(done)
}

const onLeave = (elem: HTMLElement, done: Fn) => {
  emit('leave')

  const { name, leaveAnimate, leaveDuration, leaveDelay } = props
  const animation = leaveAnimate || name
  if (!animation) return done()

  animateCSS({
    elem,
    animation,
    reverse: !leaveAnimate, // if leaveAnimate is not set, reverse is true
    leaveDuration,
    leaveDelay,
  }).then(done)
}
</script>
