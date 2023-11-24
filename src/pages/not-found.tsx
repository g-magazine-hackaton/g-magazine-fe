import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

import Button from '@/components/ui/button';

export default function NotFoundPage() {
  const error = useRouteError() as Error;

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-y-4">
      <h1 className="text-5xl font-bold">죄송합니다.</h1>
      <p className="text-xl">페이지를 찾을 수 없습니다.</p>
      <p className="text-lg text-gray-500">
        <i>{error.statusText || error.message}</i>
      </p>
      <Button>
        <Link to="/">메인 페이지로 돌아가기</Link>
      </Button>
    </div>
  );
}
