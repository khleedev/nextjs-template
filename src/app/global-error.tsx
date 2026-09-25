'use client';
import './globals.css';
import { pretendard } from '@/shared/fonts';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

// global-error는 루트 레이아웃을 대체하므로 자체 html/body와 전역 스타일·폰트를 직접 포함해야 한다.
// metadata export를 사용할 수 없어 문서 제목을 <title>로 지정한다.
export default function GlobalError({ error, unstable_retry }: GlobalErrorProps) {
  return (
    <html lang="ko" className={`h-full antialiased ${pretendard.variable}`}>
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
        <title>오류 발생</title>
        <h1 className="text-3xl font-semibold tracking-tight">문제가 발생했습니다</h1>
        <p className="text-sm text-zinc-500">
          {error.message || '알 수 없는 오류가 발생했습니다.'}
        </p>
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="rounded-lg border px-4 py-2 text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
        >
          다시 시도
        </button>
      </body>
    </html>
  );
}
