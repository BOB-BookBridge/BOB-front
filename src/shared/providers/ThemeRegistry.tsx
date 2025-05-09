'use client';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/shared/config/theme';
import GlobalStyle from '@/shared/styles/GlobalStyles';

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
