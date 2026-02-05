/**
 * ScrollSmoother 설정
 * 부드러운 스크롤 효과를 관리합니다.
 */
import { ScrollSmoother } from '../core/gsap.js'

let smoother = null

/**
 * ScrollSmoother 옵션
 * @typedef {Object} SmootherOptions
 * @property {number} smooth - 스크롤 부드러움 정도 (기본: 1)
 * @property {number} effects - 패럴랙스 효과 강도 (기본: true)
 * @property {string} wrapper - 래퍼 요소 선택자
 * @property {string} content - 콘텐츠 요소 선택자
 */

/**
 * ScrollSmoother 초기화
 * @param {Partial<SmootherOptions>} options - 옵션
 * @returns {ScrollSmoother|null}
 */
export function initScrollSmoother(options = {}) {
  // 기존 인스턴스 정리
  if (smoother) {
    smoother.kill()
    smoother = null
  }

  const wrapper = document.querySelector('#smooth-wrapper')
  const content = document.querySelector('#smooth-content')

  // 필수 요소가 없으면 초기화하지 않음
  if (!wrapper || !content) {
    console.warn('ScrollSmoother: #smooth-wrapper 또는 #smooth-content 요소가 없습니다.')
    return null
  }

  smoother = ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.2,
    effects: true,
    smoothTouch: 0.1,
    ...options,
  })

  return smoother
}

/**
 * ScrollSmoother 인스턴스 반환
 * @returns {ScrollSmoother|null}
 */
export function getSmoother() {
  return smoother
}

/**
 * ScrollSmoother 파괴
 */
export function destroyScrollSmoother() {
  if (smoother) {
    smoother.kill()
    smoother = null
  }
}

/**
 * 특정 요소나 위치로 부드럽게 스크롤
 * @param {string|number|HTMLElement} target - 대상 요소, 선택자, 또는 Y 위치
 * @param {boolean} smooth - 부드러운 스크롤 여부 (기본: true)
 */
export function scrollTo(target, smooth = true) {
  if (smoother) {
    smoother.scrollTo(target, smooth)
  } else {
    // ScrollSmoother가 없으면 기본 스크롤 사용
    const element = typeof target === 'string' ? document.querySelector(target) : target
    if (element instanceof HTMLElement) {
      element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: smooth ? 'smooth' : 'auto' })
    }
  }
}
