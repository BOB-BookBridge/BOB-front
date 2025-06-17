'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib';

export function ReactQueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
