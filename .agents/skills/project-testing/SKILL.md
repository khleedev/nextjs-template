---
name: project-testing
description: 이 저장소의 테스트 작성·수정·리뷰 시 적용하는 테스트 도구 선택과 모킹 지침.
---

# 테스트

- 단위·컴포넌트 테스트는 Vitest + React Testing Library를 사용한다. 위치와 환경은 `vitest.config.ts`를 확인하고 `pnpm test`로 실행한다.
- 사용자 흐름은 Playwright로 검증한다. 위치와 서버 설정은 `playwright.config.ts`를 확인하고 `pnpm test:e2e`로 실행한다.
- 테스트 대상의 핵심 의존성은 모킹하지 않는다. 예: fetch 래퍼 테스트에서 fetch 모킹 금지.
- 관심사 밖의 외부 경계는 모킹할 수 있다. 예: 컴포넌트 테스트에서 API 호출 격리.
- 호출이 불가능하거나 부작용이 있는 외부 서비스(예: 결제 API)는 모킹한다.
- 네트워크 IO 모듈은 `node:http` 실제 서버를 테스트 내에서 띄워 검증하는 방식을 우선한다.
