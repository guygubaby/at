import { gsap } from 'gsap'
import type { Directive, DirectiveBinding } from 'vue'
import type { GsapVariants } from './types'

/**
 * Define gsap directive
 */
export const defineDirective = (): Directive<HTMLElement, any> => {
  const register = (
    el: HTMLElement,
    binding: DirectiveBinding<GsapVariants>,
  ) => {
    const options = binding.value
    const { initial = {}, enter = {} } = options
    gsap.fromTo(el, initial, {
      ...enter,
      onComplete: () => enter.onComplete?.(el),
    })
  }

  return {
    mounted: register,
  }
}
