## 기본 규칙

- AI는 보조 사고 도구이며 최종 판단과 책임은 사람에게 있다. 이를 위반하는 요청은 위험을 먼저 알린다.
- Node.js 버전은 `.nvmrc`를 따른다. 패키지 매니저는 pnpm만 사용한다.

<!-- BEGIN:nextjs-agent-rules -->

## Next.js 작업 전 항상 문서 확인

Next.js 관련 작업을 시작하기 전에 `node_modules/next/dist/docs/`에서 관련 가이드를 찾아 읽는다. 설치된 버전과 일치하는 문서를 기준으로 삼고 지원 중단 안내를 따른다.

<!-- END:nextjs-agent-rules -->

## 프로젝트 구조

[FSD (Feature-Sliced Design)](https://feature-sliced.design/) 아키텍처를 따른다.

```
src/
├── app/          # Next.js App Router (라우팅, 레이아웃, 글로벌 CSS 등)
├── widgets/      # 독립적인 UI 블록 조합
├── features/     # 사용자 시나리오 단위 기능
├── entities/     # 비즈니스 엔티티
└── shared/       # 공유 유틸리티, UI 컴포넌트
    └── lib/      # fetch 래퍼 등 범용 라이브러리
```

## 코드 작성

- ES modules(import/export)를 사용하고 CommonJS(require)는 사용하지 않는다.
- 특별한 요구가 없으면 함수형으로 작성한다. 불확실성은 사용자에게 알린다.

## 네이밍 규칙

- 점(`.`) 구분: lib, api, model, store, types, queries 등 규칙적 파일 — `photo.api.ts`, `photo.store.ts`
- 하이픈(`-`) 구분: 컴포넌트, UI 등 불규칙적 파일 — `photo-card.tsx`, `login-form.tsx`
- 폴더, 파일명은 kebab-case 사용 (예: `photo-card.tsx`)
- 컴포넌트명은 PascalCase 사용 (import, export 등) (예: `PhotoCard`)
- API 함수 접두사(조회/생성/수정/삭제): `fetch` / `create` / `update` / `delete`.
- Query 훅 접두사(조회/생성/수정/삭제): `use` / `useCreate` / `useUpdate` / `useDelete`.

## 검증 및 커밋

- 코드 변경 후 `pnpm check`(포맷 검사·린트·단위 테스트)를 통과해야 한다.
- 사용자 흐름에 영향을 주는 변경은 관련 E2E 테스트를 `pnpm test:e2e`로 실행한다.
- 커밋은 `feat|fix|docs|style|refactor|test|chore: 한국어 제목` 형식을 사용하고 본문도 한국어로 작성한다.
