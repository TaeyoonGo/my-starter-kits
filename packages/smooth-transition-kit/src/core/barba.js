/**
 * Barba.js 초기화 및 페이지 전환 효과
 * 페이지 간 부드러운 전환을 관리합니다.
 */
import barba from '@barba/core'
import { gsap, ScrollTrigger } from './gsap.js'
import { initScrollSmoother, destroyScrollSmoother } from '../animations/smoother.js'
import { initScrollAnimations } from '../animations/scroll.js'
import { initTextAnimations } from '../animations/text.js'

/**
 * 페이지 진입 애니메이션
 * @param {HTMLElement} container - Barba 컨테이너
 * @returns {gsap.core.Timeline}
 */
function enterAnimation(container) {
  const tl = gsap.timeline()

  tl.fromTo(
    container,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
  )

  return tl
}

/**
 * 페이지 이탈 애니메이션
 * @param {HTMLElement} container - Barba 컨테이너
 * @returns {gsap.core.Timeline}
 */
function leaveAnimation(container) {
  const tl = gsap.timeline()

  tl.to(container, {
    opacity: 0,
    y: -30,
    duration: 0.4,
    ease: 'power2.in',
  })

  return tl
}

/**
 * 페이지 전환 후 애니메이션 초기화
 * @param {HTMLElement} container - 새 페이지 컨테이너
 */
function initPageAnimations(container) {
  // ScrollSmoother 재초기화
  initScrollSmoother()

  // 스크롤 애니메이션 초기화
  initScrollAnimations(container)

  // 텍스트 애니메이션 초기화
  initTextAnimations(container)
}

/**
 * Barba.js 초기화
 */
export function initBarba() {
  barba.init({
    // 전환 중 스크롤 방지
    preventRunning: true,

    transitions: [
      {
        name: 'default-transition',

        // 이탈 전 처리
        beforeLeave() {
          // ScrollTrigger 정리
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
          destroyScrollSmoother()
        },

        // 이탈 애니메이션
        leave(data) {
          return leaveAnimation(data.current.container)
        },

        // 진입 전 처리
        beforeEnter() {
          // 스크롤 위치 초기화
          window.scrollTo(0, 0)
        },

        // 진입 애니메이션
        enter(data) {
          return enterAnimation(data.next.container)
        },

        // 진입 후 처리
        afterEnter(data) {
          initPageAnimations(data.next.container)
        },
      },
    ],
  })
}

export { enterAnimation, leaveAnimation, initPageAnimations }
