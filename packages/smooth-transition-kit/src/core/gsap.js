/**
 * GSAP 초기화 및 플러그인 등록
 * 모든 GSAP 플러그인을 중앙에서 관리합니다.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'

// 플러그인 등록
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

// 기본 설정
gsap.defaults({
  ease: 'power2.out',
  duration: 0.8,
})

// ScrollTrigger 기본 설정
ScrollTrigger.defaults({
  toggleActions: 'play none none reverse',
})

export { gsap, ScrollTrigger, ScrollSmoother, SplitText }
