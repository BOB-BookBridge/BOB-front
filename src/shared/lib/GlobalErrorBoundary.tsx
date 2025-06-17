'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { FallbackGlobal } from '@/shared/ui';

export default function GlobalErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={FallbackGlobal}>{children}</ErrorBoundary>
  );
}
