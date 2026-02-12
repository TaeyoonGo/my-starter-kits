/**
 * GSAP + Barba.js 스타터킷 진입점
 * 모든 모듈을 통합하고 초기화합니다.
 */

// 스타일 import (Vite에서 처리)
import './styles/main.css'

// 코어 모듈
import { gsap, ScrollTrigger, ScrollSmoother, SplitText } from './core/gsap.js'
import { initBarba, initPageAnimations } from './core/barba.js'

// 애니메이션 유틸리티
import { initScrollSmoother, getSmoother, scrollTo } from './animations/smoother.js'
import { fadeIn, slideIn, scaleIn, staggerIn, parallax, initScrollAnimations } from './animations/scroll.js'
import { charsReveal, wordsReveal, linesReveal, typewriter, charsScatter, initTextAnimations } from './animations/text.js'

/**
 * 앱 초기화
 */
function init() {
  // ScrollSmoother 초기화
  initScrollSmoother()

  // 초기 페이지 애니메이션
  initScrollAnimations(document)
  initTextAnimations(document)

  // Barba.js 초기화
  initBarba()

  console.log('GSAP + Barba.js 스타터킷이 초기화되었습니다.')
}

// DOM 로드 후 초기화
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

// 전역에서 사용할 수 있도록 export
export {
  // GSAP 코어
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,

  // ScrollSmoother 유틸리티
  initScrollSmoother,
  getSmoother,
  scrollTo,

  // 스크롤 애니메이션
  fadeIn,
  slideIn,
  scaleIn,
  staggerIn,
  parallax,
  initScrollAnimations,

  // 텍스트 애니메이션
  charsReveal,
  wordsReveal,
  linesReveal,
  typewriter,
  charsScatter,
  initTextAnimations,

  // Barba
  initBarba,
  initPageAnimations,
}
