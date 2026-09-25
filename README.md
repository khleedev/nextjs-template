# Next.js Boilerplate

Next.js 16 + React 19 기반 보일러플레이트 프로젝트.

## 기술 스택

| 카테고리      | 도구                                                        |
| ------------- | ----------------------------------------------------------- |
| Node.js       | 24.14.1 (LTS)                                               |
| 프레임워크    | Next.js 16.3.6, React / React DOM 19.3.0                    |
| 언어·타입     | TypeScript 7.0.2, React / React DOM 타입 19.3.0             |
| 데이터·상태   | TanStack Query 5.103.2, Zustand 5.0.15                      |
| 스타일링      | Tailwind CSS / PostCSS 플러그인 4.3.3, tailwind-merge 3.7.0 |
| 유틸리티      | dayjs 1.11.23, es-toolkit 1.52.0                            |
| 폰트          | Pretendard (Variable)                                       |
| 린터          | oxlint 1.85.0                                               |
| 포매터        | oxfmt 0.70.0                                                |
| 단위 테스트   | Vitest / Vitest UI 5.0.1, React Testing Library             |
| E2E 테스트    | Playwright 1.63.0                                           |
| Git 훅        | husky + lint-staged                                         |
| 패키지 매니저 | pnpm                                                        |

정확한 의존성 범위와 설치 버전은 각각 `package.json`과 `pnpm-lock.yaml`을 기준으로 한다. oxfmt는 현재 공식적으로 Beta 단계다.

## 프로젝트 구조

[FSD (Feature-Sliced Design)](https://feature-sliced.design/) 아키텍처를 따른다.

```
src/
├── app/          # Next.js App Router (라우팅, 레이아웃)
├── widgets/      # 독립적인 UI 블록 조합
├── features/     # 사용자 시나리오 단위 기능
├── entities/     # 비즈니스 엔티티
└── shared/       # 공유 유틸리티, UI 컴포넌트
    └── lib/      # fetch 래퍼 등 범용 라이브러리
```

## 시작하기

```bash
pnpm install
pnpm dev
```

http://localhost:3000 에서 확인.

## 환경변수

`.env.example`을 복사해 `.env.local`을 만든다. 값 검증은 `src/shared/config/env.ts`에서 처리한다.

```bash
cp .env.example .env.local
```

| 변수                       | 설명                                               |
| -------------------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_API_BASE_URL` | 공개 API base URL (미설정 시 데모 엔드포인트 폴백) |

## 스크립트

| 명령어              | 설명                       |
| ------------------- | -------------------------- |
| `pnpm dev`          | 개발 서버 실행             |
| `pnpm build`        | 프로덕션 빌드              |
| `pnpm start`        | 프로덕션 서버 실행         |
| `pnpm lint`         | oxlint 린트 검사           |
| `pnpm format`       | oxfmt 포매팅 적용          |
| `pnpm format:check` | 포매팅 검사 (CI용)         |
| `pnpm test`         | Vitest 단위 테스트 실행    |
| `pnpm test:watch`   | Vitest watch 모드          |
| `pnpm check`        | 포맷·린트·단위 테스트 검사 |
| `pnpm test:e2e`     | Playwright E2E 테스트 실행 |

## 네이밍 규칙

### 파일명

- **`.` 구분**: lib, api, model, store, types, queries 등 규칙적 파일 — `photo.api.ts`, `photo.store.ts`
- **`-` 구분**: 컴포넌트, UI 등 불규칙적 파일 — `photo-card.tsx`, `login-form.tsx`

### API 함수 접두사

| 동작 | 접두사   | 예시          |
| ---- | -------- | ------------- |
| 조회 | `fetch`  | `fetchPhotos` |
| 생성 | `create` | `createPhoto` |
| 수정 | `update` | `updatePhoto` |
| 삭제 | `delete` | `deletePhoto` |

### Query 훅 접두사

| 동작 | 접두사      | 예시             |
| ---- | ----------- | ---------------- |
| 조회 | `use`       | `usePhotos`      |
| 생성 | `useCreate` | `useCreatePhoto` |
| 수정 | `useUpdate` | `useUpdatePhoto` |
| 삭제 | `useDelete` | `useDeletePhoto` |

## 코드 품질

커밋 시 husky + lint-staged가 자동 실행된다.

- JS/TS 파일: `oxfmt --write` + `oxlint`
- CSS/MD/JSON 파일: `oxfmt --write`

## 테스트

- **단위 테스트**: `src/**/*.test.{ts,tsx}` — Vitest + React Testing Library
- **E2E 테스트**: `e2e/**/*.spec.ts` — Playwright

Playwright를 처음 설치하거나 업데이트한 뒤에는 `pnpm exec playwright install chromium`으로 테스트용 브라우저를 설치한다. 의존성 업데이트 후 `pnpm check`, `pnpm build`, `pnpm test:e2e`를 실행한다.
