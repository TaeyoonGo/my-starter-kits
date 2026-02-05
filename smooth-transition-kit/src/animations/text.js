/**
 * SplitText 헬퍼 함수
 * 텍스트 애니메이션을 쉽게 생성합니다.
 */
import { gsap, SplitText, ScrollTrigger } from '../core/gsap.js'

// 생성된 SplitText 인스턴스 추적 (정리용)
const splitInstances = []

/**
 * 텍스트 요소 분할
 * @param {string|HTMLElement} target - 대상 요소
 * @param {Object} options - SplitText 옵션
 * @returns {SplitText}
 */
export function splitText(target, options = {}) {
  const split = new SplitText(target, {
    type: 'chars, words, lines',
    linesClass: 'split-line',
    wordsClass: 'split-word',
    charsClass: 'split-char',
    ...options,
  })

  splitInstances.push(split)
  return split
}

/**
 * 글자별 나타나기 애니메이션
 * @param {string|HTMLElement} target - 대상 요소
 * @param {Object} options - 애니메이션 옵션
 */
export function charsReveal(target, options = {}) {
  const split = splitText(target, { type: 'chars' })

  gsap.fromTo(
    split.chars,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: target,
        start: 'top 85%',
        ...options.scrollTrigger,
      },
      ...options,
    }
  )

  return split
}

/**
 * 단어별 나타나기 애니메이션
 * @param {string|HTMLElement} target - 대상 요소
 * @param {Object} options - 애니메이션 옵션
 */
export function wordsReveal(target, options = {}) {
  const split = splitText(target, { type: 'words' })

  gsap.fromTo(
    split.words,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: target,
        start: 'top 85%',
        ...options.scrollTrigger,
      },
      ...options,
    }
  )

  return split
}

/**
 * 줄별 나타나기 애니메이션
 * @param {string|HTMLElement} target - 대상 요소
 * @param {Object} options - 애니메이션 옵션
 */
export function linesReveal(target, options = {}) {
  const split = splitText(target, { type: 'lines' })

  gsap.fromTo(
    split.lines,
    { opacity: 0, y: 40, clipPath: 'inset(100% 0 0 0)' },
    {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0 0 0)',
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: target,
        start: 'top 85%',
        ...options.scrollTrigger,
      },
      ...options,
    }
  )

  return split
}

/**
 * 타이핑 효과 애니메이션
 * @param {string|HTMLElement} target - 대상 요소
 * @param {Object} options - 애니메이션 옵션
 */
export function typewriter(target, options = {}) {
  const split = splitText(target, { type: 'chars' })

  gsap.fromTo(
    split.chars,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.01,
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: target,
        start: 'top 85%',
        ...options.scrollTrigger,
      },
      ...options,
    }
  )

  return split
}

/**
 * 글자 흩어지기 효과
 * @param {string|HTMLElement} target - 대상 요소
 * @param {Object} options - 애니메이션 옵션
 */
export function charsScatter(target, options = {}) {
  const split = splitText(target, { type: 'chars' })

  gsap.fromTo(
    split.chars,
    {
      opacity: 0,
      x: () => gsap.utils.random(-50, 50),
      y: () => gsap.utils.random(-50, 50),
      rotation: () => gsap.utils.random(-30, 30),
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: target,
        start: 'top 85%',
        ...options.scrollTrigger,
      },
      ...options,
    }
  )

  return split
}

/**
 * 모든 SplitText 인스턴스 정리
 * 페이지 전환 시 호출하여 메모리 정리
 */
export function cleanupSplits() {
  splitInstances.forEach((split) => split.revert())
  splitInstances.length = 0
}

/**
 * data-text-animate 속성 기반 자동 텍스트 애니메이션 초기화
 * @param {HTMLElement} container - 검색할 컨테이너 (기본: document)
 */
export function initTextAnimations(container = document) {
  // data-text-animate="chars" 요소
  container.querySelectorAll('[data-text-animate="chars"]').forEach((el) => {
    charsReveal(el)
  })

  // data-text-animate="words" 요소
  container.querySelectorAll('[data-text-animate="words"]').forEach((el) => {
    wordsReveal(el)
  })

  // data-text-animate="lines" 요소
  container.querySelectorAll('[data-text-animate="lines"]').forEach((el) => {
    linesReveal(el)
  })

  // data-text-animate="typewriter" 요소
  container.querySelectorAll('[data-text-animate="typewriter"]').forEach((el) => {
    typewriter(el)
  })

  // data-text-animate="scatter" 요소
  container.querySelectorAll('[data-text-animate="scatter"]').forEach((el) => {
    charsScatter(el)
  })
}
