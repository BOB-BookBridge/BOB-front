'use client';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { light, dark } from '@/shared/config/theme';
import GlobalStyle from '@/shared/styles/GlobalStyles';
import { useThemeStore } from '../model';

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const mode = useThemeStore((state) => state.mode);
  const theme = mode == 'dark' ? dark : light;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
