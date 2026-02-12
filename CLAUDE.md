# CLAUDE.md

클로드 코드 스타터킷 모노레포입니다.

## 구조

```
my-starter-kits/
├── packages/
│   └── smooth-transition-kit/   # GSAP + Barba.js 페이지 전환
│   └── (추가 예정...)
└── package.json
```

## 명령어

```bash
# 의존성 설치
npm install

# 전체 패키지 개발 서버 실행
npm run dev

# 전체 패키지 빌드
npm run build

# 특정 패키지만 실행
npm run dev -w smooth-transition-kit
```

## 새 스타터킷 추가 방법

1. `packages/` 폴더에 새 디렉토리 생성
2. `package.json` 작성 (name 필드 필수)
3. `CLAUDE.md` 작성 (해당 킷 사용법)
4. `npm install`로 의존성 연결

## 패키지 목록

| 패키지 | 설명 | 기술 스택 |
|--------|------|-----------|
| smooth-transition-kit | 페이지 전환 애니메이션 | GSAP, Barba.js, Vite |
