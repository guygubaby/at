import type { MaybeRef } from '@vueuse/core'
import type { TransitionProps } from 'vue'

export type AnimateCssNames =
// Attention seekers
'bounce' |
'flash' |
'pulse' |
'rubberBand' |
'shakeX' |
'shakeY' |
'headShake' |
'swing' |
'tada' |
'wobble' |
'jello' |
'heartBeat' |
// Back entrances
'backInDown' |
'backInLeft' |
'backInRight' |
'backInUp' |
// Back exits
'backOutDown' |
'backOutLeft' |
'backOutRight' |
'backOutUp' |
// Bouncing entrances
'bounceIn'|
'bounceInDown'|
'bounceInLeft'|
'bounceInRight'|
'bounceInUp'|
// Bouncing exits
'bounceOut'|
'bounceOutDown'|
'bounceOutLeft'|
'bounceOutRight'|
'bounceOutUp'|
// Fading entrances
'fadeIn'|
'fadeInDown'|
'fadeInDownBig'|
'fadeInLeft'|
'fadeInLeftBig'|
'fadeInRight'|
'fadeInRightBig'|
'fadeInUp'|
'fadeInUpBig'|
'fadeInTopLeft'|
'fadeInTopRight'|
'fadeInBottomLeft'|
'fadeInBottomRight'|
// Fading exits
'fadeOut'|
'fadeOutDown'|
'fadeOutDownBig'|
'fadeOutLeft'|
'fadeOutLeftBig'|
'fadeOutRight'|
'fadeOutRightBig'|
'fadeOutUp'|
'fadeOutUpBig'|
'fadeOutTopLeft'|
'fadeOutTopRight'|
'fadeOutBottomRight'|
'fadeOutBottomLeft'|
// Flippers
'flip'|
'flipInX'|
'flipInY'|
'flipOutX'|
'flipOutY'|
// Lightspeed
'lightSpeedInRight'|
'lightSpeedInLeft'|
'lightSpeedOutRight'|
'lightSpeedOutLeft'|
// Rotating entrances
'rotateIn'|
'rotateInDownLeft'|
'rotateInDownRight'|
'rotateInUpLeft'|
'rotateInUpRight'|
// Rotating exits
'rotateOut'|
'rotateOutDownLeft'|
'rotateOutDownRight'|
'rotateOutUpLeft'|
'rotateOutUpRight'|
// Specials
'hinge'|
'jackInTheBox'|
'rollIn'|
'rollOut'|
// Zooming entrances
'zoomIn'|
'zoomInDown'|
'zoomInLeft'|
'zoomInRight'|
'zoomInUp'|
// Zooming exits
'zoomOut'|
'zoomOutDown'|
'zoomOutLeft'|
'zoomOutRight'|
'zoomOutUp'|
// Sliding entrances
'slideInDown'|
'slideInLeft'|
'slideInRight'|
'slideInUp'|
// Sliding exits
'slideOutDown'|
'slideOutLeft'|
'slideOutRight'|
'slideOutUp'

export interface PropsType {
  /**
   * @deprecated use `animate` instead
   *
   * Animation name from animate.css, default is ''
   */
  name?: AnimateCssNames
  /**
   * Animation name from animate.css, default is ''
   */
  animate?: AnimateCssNames
  /**
   * Enter animation name, default is `name/animate`, higher property than `name/animate` if set
   */
  enterAnimate?: AnimateCssNames
  /**
   * Leave animation name, default is `name/animate`, higher property than `name/animate` if set
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
  /**
   * https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
   */
  type?: TransitionProps['type']
}

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

export type AnimateElemPayload = Pick<AnimatePayload, 'elem' | 'animation' | 'delay' | 'duration' | 'repeat' | 'direction'>
