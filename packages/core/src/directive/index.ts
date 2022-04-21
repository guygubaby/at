import { isString } from '@bryce-loskie/utils'
import type { Directive, DirectiveBinding } from 'vue'
import type { AnimateCssNames, AnimateElemPayload } from '../at/types'
import { animateElem } from '../at/utils'

export const defineDirective = (): Directive<HTMLElement, any> => {
  const register = (
    el: HTMLElement,
    binding: DirectiveBinding,
  ) => {
    if (isString(binding.value)) {
      const animation = binding.value as AnimateCssNames
      animateElem({
        elem: el,
        animation,
      })
    }
    else {
      const options = binding.value as Omit<AnimateElemPayload, 'elem'>
      animateElem({
        elem: el,
        ...options,
      })
    }
  }

  return {
    mounted: register,
  }
}
