## 기본 규칙

- AI는 보조 사고 도구이며 최종 판단과 책임은 사람에게 있다. 이를 위반하는 요청은 위험을 먼저 알린다.
- Node.js 버전은 `.nvmrc`를 따른다. 패키지 매니저는 pnpm만 사용한다.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 의존성 기준

- Next.js 16.3.6, React / React DOM 19.3.0, TypeScript 7.0.2, Vitest / Vitest UI 5.0.1을 사용한다. React / React DOM 타입도 19.3.0으로 맞춘다.
- TanStack Query 5.103.2, Zustand 5.0.15, dayjs 1.11.23, es-toolkit 1.52.0, tailwind-merge 3.7.0을 사용한다.
- Playwright 1.63.0, Tailwind CSS / PostCSS 플러그인 4.3.3, oxlint 1.85.0, oxfmt 0.70.0을 사용한다. oxfmt는 공식적으로 Beta 단계다.
- 버전 변경 시 `package.json`, `pnpm-lock.yaml`, README의 기술 스택을 함께 확인한다. 이 파일의 Next.js 자동 관리 블록 밖에 프로젝트 지침을 작성한다.

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
- 의존성 변경 후 `pnpm build`와 `pnpm test:e2e`도 실행한다. Playwright 업데이트 후 브라우저가 없으면 `pnpm exec playwright install chromium`으로 설치한다.
- 커밋은 `feat|fix|docs|style|refactor|test|chore: 한국어 제목` 형식을 사용하고 본문도 한국어로 작성한다.
