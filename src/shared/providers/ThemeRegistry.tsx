'use client';
import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { light, dark } from '@/shared/config/theme';
import GlobalStyle from '@/shared/styles/GlobalStyles';
import { useThemeStore } from '../model';

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const mode = useThemeStore((state) => state.mode);
  const theme = mode == 'dark' ? dark : light;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
