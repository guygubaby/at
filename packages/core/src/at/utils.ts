import { unref } from 'vue'
import type { Fn } from '@vueuse/core'
import { noop } from '@bryce-loskie/utils'
import type { AnimateElemPayload, AnimatePayload, PropsType } from './types'
import { DEFAULT_DIRATION } from './constants'

export const isDef = (val: unknown): val is NonNullable<typeof val> => val !== undefined && val !== null

export const isLooseTruthy = (val: unknown): val is true => isDef(val) && val !== ''

const addClass = (node: HTMLElement, ...clazz: string[]) => {
  node.classList.add(...clazz)
  return () => node.classList.remove(...clazz)
}

const setDuration = (node: HTMLElement, duration: number) => {
  node.style.setProperty('--animate-duration', `${duration}ms`)
  return () => node.style.removeProperty('--animate-duration')
}

const setDelay = (node: HTMLElement, delay: number) => {
  node.style.animationDelay = `${delay}ms`
  return () => node.style.animationDelay = ''
}

const setRepeat = (node: HTMLElement, repeat: AnimatePayload['repeat']) => {
  node.style.animationIterationCount = `${repeat ?? ''}`
  return () => node.style.animationIterationCount = ''
}

const setDirection = (node: HTMLElement, direction: AnimatePayload['direction']) => {
  node.style.animationDirection = direction ?? 'normal'
  return () => node.style.animationDirection = ''
}

export const animateCSS = (payload: AnimatePayload) => {
  const cleanups: Fn[] = []

  const cleanSideEffects = () => {
    cleanups.forEach(fn => fn())
    cleanups.length = 0
  }

  return new Promise<boolean>((resolve) => {
    const { elem, animation, reverse = false, duration = DEFAULT_DIRATION, delay = 0, repeat, direction, onComplete = noop } = payload

    const node = unref(elem)

    if (!node) {
      onComplete(node)
      return resolve(false)
    }

    const prefix = 'animate__'

    const animationName = `${prefix}${animation}`
    const animatedName = `${prefix}animated`
    const animationDirection: AnimateElemPayload['direction'] = reverse ? 'reverse' : direction

    cleanups.push(
      setDuration(node, duration),
      setDelay(node, delay),
      setDirection(node, animationDirection),
      setRepeat(node, repeat),
      addClass(node, animatedName, animationName),
    )

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event: AnimationEvent) {
      event.stopPropagation()
      cleanSideEffects()
      onComplete(node)
      resolve(true)
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true })
  })
}

/**
 * Directly apply animation on an element
 */
export const animateElem = (payload: AnimateElemPayload) => animateCSS(payload)

/**
 * Default options with ts type
 *
 * ```html
 * <AT v-bind='transitionOptions'>
 *  <something-magic />
 * </AT>
 * ```
 *
 * ```typescript
 * const transitionOptions = defineOptions({
 *    appear: true,
 *    enterAnimate: AnimateCssPresets.backInDown,
 *    leaveAnimate: AnimateCssPresets.backOutUp,
 *    duration: 500,
 *  })
 * ```
 *
 * @param options AT transition options
 * @returns passed options
 */
export const defineOptions = (options: PropsType) => options

/**
 * used to define variants for v-animate directive
 */
export const defineVariants = (options: Omit<AnimateElemPayload, 'elem'>) => options
