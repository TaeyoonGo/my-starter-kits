/**
 * ScrollTrigger 헬퍼 함수
 * 스크롤 기반 애니메이션을 쉽게 생성합니다.
 */
import { gsap, ScrollTrigger } from '../core/gsap.js'

/**
 * 페이드 인 애니메이션 생성
 * @param {string|HTMLElement|HTMLElement[]} targets - 대상 요소
 * @param {Object} options - ScrollTrigger 옵션
 */
export function fadeIn(targets, options = {}) {
  const elements = gsap.utils.toArray(targets)

  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 20%',
          ...options,
        },
      }
    )
  })
}

/**
 * 슬라이드 인 애니메이션 생성
 * @param {string|HTMLElement|HTMLElement[]} targets - 대상 요소
 * @param {'left'|'right'} direction - 슬라이드 방향
 * @param {Object} options - ScrollTrigger 옵션
 */
export function slideIn(targets, direction = 'left', options = {}) {
  const elements = gsap.utils.toArray(targets)
  const xOffset = direction === 'left' ? -100 : 100

  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: xOffset },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 20%',
          ...options,
        },
      }
    )
  })
}

/**
 * 스케일 인 애니메이션 생성
 * @param {string|HTMLElement|HTMLElement[]} targets - 대상 요소
 * @param {Object} options - ScrollTrigger 옵션
 */
export function scaleIn(targets, options = {}) {
  const elements = gsap.utils.toArray(targets)

  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 20%',
          ...options,
        },
      }
    )
  })
}

/**
 * 스태거 애니메이션 생성 (여러 요소가 순차적으로 나타남)
 * @param {string|HTMLElement|HTMLElement[]} targets - 대상 요소들
 * @param {Object} options - ScrollTrigger 옵션
 */
export function staggerIn(targets, options = {}) {
  const elements = gsap.utils.toArray(targets)

  if (elements.length === 0) return

  gsap.fromTo(
    elements,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: elements[0].parentElement || elements[0],
        start: 'top 85%',
        end: 'top 20%',
        ...options,
      },
    }
  )
}

/**
 * 패럴랙스 효과 생성
 * @param {string|HTMLElement|HTMLElement[]} targets - 대상 요소
 * @param {number} speed - 패럴랙스 속도 (기본: 0.5)
 */
export function parallax(targets, speed = 0.5) {
  const elements = gsap.utils.toArray(targets)

  elements.forEach((el) => {
    gsap.to(el, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
}

/**
 * 핀 섹션 생성 (스크롤 시 고정)
 * @param {string|HTMLElement} trigger - 트리거 요소
 * @param {string|HTMLElement} pinElement - 고정할 요소
 * @param {Object} options - ScrollTrigger 옵션
 * @returns {ScrollTrigger}
 */
export function pinSection(trigger, pinElement, options = {}) {
  return ScrollTrigger.create({
    trigger,
    pin: pinElement,
    start: 'top top',
    end: 'bottom bottom',
    pinSpacing: true,
    ...options,
  })
}

/**
 * 진행률 기반 애니메이션
 * @param {string|HTMLElement} trigger - 트리거 요소
 * @param {Function} onUpdate - 진행률 업데이트 콜백 (progress: 0~1)
 * @param {Object} options - ScrollTrigger 옵션
 * @returns {ScrollTrigger}
 */
export function progressTrigger(trigger, onUpdate, options = {}) {
  return ScrollTrigger.create({
    trigger,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => onUpdate(self.progress),
    ...options,
  })
}

/**
 * data-animate 속성 기반 자동 애니메이션 초기화
 * @param {HTMLElement} container - 검색할 컨테이너 (기본: document)
 */
export function initScrollAnimations(container = document) {
  // data-animate="fade" 요소
  fadeIn(container.querySelectorAll('[data-animate="fade"]'))

  // data-animate="slide-left" 요소
  slideIn(container.querySelectorAll('[data-animate="slide-left"]'), 'left')

  // data-animate="slide-right" 요소
  slideIn(container.querySelectorAll('[data-animate="slide-right"]'), 'right')

  // data-animate="scale" 요소
  scaleIn(container.querySelectorAll('[data-animate="scale"]'))

  // data-animate="stagger" 요소의 자식들
  container.querySelectorAll('[data-animate="stagger"]').forEach((parent) => {
    staggerIn(parent.children)
  })

  // data-parallax 요소
  container.querySelectorAll('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax) || 0.5
    parallax(el, speed)
  })
}

export { ScrollTrigger }
