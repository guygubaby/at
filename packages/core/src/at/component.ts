import type { Fn } from '@vueuse/core'
import type { PropType, TransitionProps } from 'vue'
import { Transition, defineComponent, h } from 'vue'
import type { AnimateCssNames } from './types'
import { DEFAULT_DIRATION } from './constants'
import { animateCSS, isLooseTruthy } from './utils'

export default defineComponent({
  name: 'At',
  props: {
    /**
   * @deprecated use `animate` instead
   *
   * Animation name from animate.css, default is ''
   */
    name: {
      type: String as PropType<AnimateCssNames>,
      required: false,
      default: '',
    },
    /**
     * Animation name from animate.css, default is ''
     */
    animate: {
      type: String as PropType<AnimateCssNames>,
      required: false,
      default: '',
    },
    /**
     * Enter animation name, default is `name`, higher property than `name` if set
     */
    enterAnimate: {
      type: String as PropType<AnimateCssNames>,
      required: false,
      default: '',
    },
    /**
     * Leave animation name, default is `name`, higher property than `name` if set
     */
    leaveAnimate: {
      type: String as PropType<AnimateCssNames>,
      required: false,
      default: '',
    },
    /**
     * Animation delay, default is 0
     */
    delay: {
      type: Number,
      required: false,
      default: 0,
    },
    /**
     * Enter animation delay, default is 0, higher property than `delay` if set
     */
    enterDelay: {
      type: Number,
      required: false,
      default: 0,
    },
    /**
     * Leave animation delay, defalt is 0, higher property than `delay` if set
     */
    leaveDelay: {
      type: Number,
      required: false,
      default: 0,
    },
    /**
     * Animation duration, default is 1*1000 ms
     */
    duration: {
      type: Number,
      required: false,
      default: DEFAULT_DIRATION,
    },
    /**
     * Enter animation duration, default is `duration`, higher property than `duration` if set
     */
    enterDuration: {
      type: Number,
      required: false,
      default: DEFAULT_DIRATION,
    },
    /**
     * Leave animation duration, default is `duration`, higher property than `duration` if set
     */
    leaveDuration: {
      type: Number,
      required: false,
      default: DEFAULT_DIRATION,
    },
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
  },
  emits: ['before-enter', 'enter', 'after-enter', 'enter-cancelled', 'leave', 'before-leave', 'after-leave', 'leave-cancelled'],
  setup(props, { slots, emit }) {
    const onBeforeEnter = (el: Element) => emit('before-enter', el)
    const onAfterEnter = (el: Element) => emit('after-enter', el)
    const onEnterCancelled = (el: Element) => emit('enter-cancelled', el)
    const onBeforeLeave = (el: Element) => emit('before-leave', el)
    const onAfterLeave = (el: Element) => emit('after-leave', el)
    const onLeaveCancelled = (el: Element) => emit('leave-cancelled', el)

    const onEnter = (elem: Element, done: Fn) => {
      emit('enter')

      const { name, animate, enterAnimate, duration, enterDuration, delay, enterDelay } = props
      const animation = isLooseTruthy(enterAnimate) ? enterAnimate : isLooseTruthy(animate) ? animate : name
      if (!animation) {
        done()
        return
      }

      const finalDuration = isLooseTruthy(enterDuration) ? enterDuration : duration
      const finalDelay = isLooseTruthy(enterDelay) ? enterDelay : delay

      animateCSS({
        elem: elem as HTMLElement,
        animation,
        duration: finalDuration,
        delay: finalDelay,
      }).then(() => {
        done()
      })
    }

    const onLeave = (elem: Element, done: Fn) => {
      emit('leave')

      const { name, animate, leaveAnimate, duration, leaveDuration, delay, leaveDelay } = props
      const animation = isLooseTruthy(leaveAnimate) ? leaveAnimate : isLooseTruthy(animate) ? animate : name
      if (!animation) {
        done()
        return
      }

      const finalDuration = isLooseTruthy(leaveDuration) ? leaveDuration : duration
      const finalDelay = isLooseTruthy(leaveDelay) ? leaveDelay : delay

      animateCSS({
        elem: elem as HTMLElement,
        animation,
        reverse: !leaveAnimate, // if leaveAnimate is not set, reverse is true
        duration: finalDuration,
        delay: finalDelay,
      }).then(() => {
        done()
      })
    }

    return () => (
      h(Transition,
        {
          css: false,
          appear: props.appear,
          mode: props.mode,
          type: 'animation',
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
