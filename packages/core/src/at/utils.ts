import { unref } from 'vue'
import type { Fn, MaybeRef } from '@vueuse/core'
import type { AnimateCssNames } from './misc'
import { DEFAULT_DIRATION } from './misc'

export interface AnimatePayload {
  elem: MaybeRef<HTMLElement>
  animation: AnimateCssNames
  reverse?: boolean
  delay?: number
  duration?: number

  // following are just for animateElem function usage
  repeat?: number | string | 'infinite'
  direction?: 'reverse' | 'normal' | 'alternate' | 'alternate-reverse' | 'initial' | 'inherit'
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

  return new Promise<string>((resolve) => {
    const { elem, animation, reverse = false, duration = DEFAULT_DIRATION, delay = 0, repeat, direction } = payload

    const node = unref(elem)
    if (!node) return resolve('elem is falsy')

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
      resolve('Animation ended')
    }

    node.addEventListener('animationend', handleAnimationEnd, { once: true })
  })
}

export type AnimateElemPayload = Pick<AnimatePayload, 'elem' | 'animation' | 'delay' | 'duration' | 'repeat' | 'direction'>

/**
 * Directly apply animation on an element
 */
export const animateElem = (payload: AnimateElemPayload) => {
  return animateCSS(payload)
}
