# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
npm run dev      # 개발 서버 실행 (Vite, 자동 브라우저 오픈)
npm run build    # 프로덕션 빌드
npm run preview  # 빌드 결과물 미리보기
```

## 아키텍처

GSAP과 Barba.js를 활용한 페이지 전환 및 스크롤 애니메이션 스타터킷입니다.

### 모듈 구조

**코어 (`src/core/`)**
- `gsap.js`: GSAP 플러그인 등록 및 전역 설정 (ScrollTrigger, ScrollSmoother, SplitText)
- `barba.js`: Barba.js 페이지 전환 라이프사이클 관리. 전환 시 ScrollTrigger 정리 및 재초기화 담당

**애니메이션 유틸리티 (`src/animations/`)**
- `smoother.js`: ScrollSmoother 싱글톤 인스턴스 관리
- `scroll.js`: ScrollTrigger 기반 헬퍼 함수 (fadeIn, slideIn, scaleIn, staggerIn, parallax)
- `text.js`: SplitText 기반 헬퍼 함수 (charsReveal, wordsReveal, linesReveal, typewriter)

### 데이터 속성 기반 애니메이션

HTML 요소에 데이터 속성을 추가하면 자동으로 애니메이션이 적용됩니다:

**스크롤 애니메이션** (`data-animate`)
- `fade`, `slide-left`, `slide-right`, `scale`, `stagger`
- `data-parallax="0.5"` - 패럴랙스 효과 (숫자는 속도)

**텍스트 애니메이션** (`data-text-animate`)
- `chars`, `words`, `lines`, `typewriter`, `scatter`

### 페이지 전환 흐름

1. `beforeLeave`: ScrollTrigger 전체 정리, ScrollSmoother 파괴
2. `leave`: 페이지 이탈 애니메이션 (opacity + y)
3. `beforeEnter`: 스크롤 위치 초기화
4. `enter`: 페이지 진입 애니메이션
5. `afterEnter`: ScrollSmoother 재초기화, 애니메이션 재등록

### HTML 구조 요구사항

ScrollSmoother 작동을 위해 필수 구조:
```html
<div data-barba="wrapper">
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <main data-barba="container" data-barba-namespace="페이지명">
        <!-- 콘텐츠 -->
      </main>
    </div>
  </div>
</div>
```

### 멀티 페이지 설정

새 페이지 추가 시 `vite.config.js`의 `rollupOptions.input`에 엔트리 추가 필요.
