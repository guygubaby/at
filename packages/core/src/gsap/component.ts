import type { Fn } from '@vueuse/core'
import type { PropType, TransitionProps } from 'vue'
import { Transition, defineComponent, h } from 'vue'
import { gsap } from 'gsap'
import { noop, runAll } from '@bryce-loskie/utils'
import type { GsapVariants } from './types'

export default defineComponent({
  name: 'Gt',
  props: {
    /**
     * Vue transition mode, default to undefined
     *
     * doc: https://vuejs.org/guide/built-ins/transition.html#transition-modes
     */
    mode: {
      type: String as PropType<TransitionProps['mode']>,
      required: false,
      default: undefined,
    },
    /**
     * If you also want to apply a transition on the initial render of a node
     *
     * you can add the appear attribute
     *
     * doc: https://vuejs.org/guide/built-ins/transition.html#transition-on-appear
     */
    appear: {
      type: Boolean as PropType<TransitionProps['appear']>,
      required: false,
      default: false,
    },
    /**
     * https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
     */
    type: {
      type: String as PropType<TransitionProps['type']>,
      required: false,
      default: 'animation',
    },
    /**
     * gsap variants
     */
    variants: {
      type: Object as PropType<GsapVariants>,
      required: true,
    },
  },
  emits: ['before-enter', 'enter', 'after-enter', 'enter-cancelled', 'leave', 'before-leave', 'after-leave', 'leave-cancelled'],
  setup(props, { slots, emit }) {
    const onAfterEnter = (el: Element) => emit('after-enter', el)
    const onEnterCancelled = (el: Element) => emit('enter-cancelled', el)
    const onBeforeLeave = (el: Element) => emit('before-leave', el)
    const onAfterLeave = (el: Element) => emit('after-leave', el)
    const onLeaveCancelled = (el: Element) => emit('leave-cancelled', el)

    const onBeforeEnter = (elem: Element) => {
      const initial = props.variants.initial || {}
      initial && gsap.set(elem, initial)
      emit('before-enter', elem)
    }

    const onEnter = (elem: Element, done: Fn) => {
      const { onComplete = noop, ...enter } = props.variants.enter || {}
      gsap.to(elem, {
        ...enter,
        onComplete: () => runAll([() => onComplete(elem), () => emit('enter'), done]),
      })
    }

    const onLeave = (elem: Element, done: Fn) => {
      const { onComplete = noop, ...leave } = props.variants.leave || {}
      gsap.to(elem, {
        ...leave,
        onComplete: () => runAll([() => onComplete(elem), () => emit('leave'), done]),
      })
    }

    return () => (
      h(Transition,
        {
          css: false,
          appear: props.appear,
          mode: props.mode,
          type: props.type,
          onBeforeEnter,
          onEnter,
          onAfterEnter,
          onEnterCancelled,
          onBeforeLeave,
          onAfterLeave,
          onLeave,
          onLeaveCancelled,
        },
        slots.default,
      )
    )
  },
})
