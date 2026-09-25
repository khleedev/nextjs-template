// NEXT_PUBLIC_ 변수는 빌드 시 값으로 치환되므로,
// 클라이언트 노출 변수는 반드시 process.env.NEXT_PUBLIC_XXX 리터럴로 접근한다(동적 인덱싱 불가).

// URL 형식을 검증하고 정규화된 문자열을 반환한다. 유효하지 않으면 throw.
// 끝 슬래시를 제거해 base + path 결합 시 슬래시 중복을 막는다.
export function parseUrl(name: string, value: string): string {
  try {
    return new URL(value).href.replace(/\/$/, '');
  } catch {
    throw new Error(`환경변수 ${name}가 올바른 URL이 아닙니다: ${value}`);
  }
}

export const env = {
  // 공개 API base URL. 미설정 또는 빈 문자열이면 데모 엔드포인트로 폴백 → 클론 직후에도 샘플이 동작한다.
  // (?? 대신 || 사용: `NEXT_PUBLIC_API_BASE_URL=`처럼 빈 값이면 parseUrl('')가 throw하므로 빈 문자열도 미설정으로 취급한다.)
  apiBaseUrl: parseUrl(
    'NEXT_PUBLIC_API_BASE_URL',
    process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  ),
} as const;
