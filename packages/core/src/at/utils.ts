import { unref } from 'vue'
import type { Fn, MaybeRef } from '@vueuse/core'
import type { AnimateCssNames } from './misc'
import { DEFAULT_DIRATION } from './misc'

export const isDef = (val: unknown): val is NonNullable<unknown> => val !== undefined && val !== null

export interface AnimatePayload {
  elem: MaybeRef<HTMLElement>
  animation: AnimateCssNames
  reverse?: boolean
  delay?: number
  duration?: number
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

export const animateCSS = (payload: AnimatePayload) => {
  return new Promise<string>((resolve) => {
    const { elem, animation, reverse = false, duration = DEFAULT_DIRATION, delay = 0 } = payload

    const node = unref(elem)
    if (!node) return resolve('elem is falsy')

    const prefix = 'animate__'

    const animationName = `${prefix}${animation}`
    const animatedName = `${prefix}animated`

    cleanups.push(
      setDuration(node, duration),
      setDelay(node, delay),
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

export type AnimateElemPayload = Pick<AnimatePayload, 'elem' | 'animation' | 'delay' | 'duration'>

/**
 * Directly apply animation on an element
 */
export const animateElem = (elem: MaybeRef<HTMLElement>, animation: AnimateCssNames, duration = DEFAULT_DIRATION, delay = 0) => {
  return animateCSS({
    elem,
    animation,
    duration,
    delay,
  })
}
