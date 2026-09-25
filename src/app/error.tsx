'use client';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  // 세그먼트를 다시 가져오고 렌더링해 복구를 시도한다.
  unstable_retry: () => void;
}

// 루트 레이아웃 아래 세그먼트의 런타임 에러를 잡는 error boundary.
// 레이아웃 자체의 에러는 global-error가 담당한다.
export default function Error({ error, unstable_retry }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 px-6 py-24">
      <h1 className="text-3xl font-semibold tracking-tight">문제가 발생했습니다</h1>
      <p className="text-sm text-zinc-500">{error.message || '알 수 없는 오류가 발생했습니다.'}</p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="rounded-lg border px-4 py-2 text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
      >
        다시 시도
      </button>
    </div>
  );
}
