'use client';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { light, dark } from '@/shared/config/theme';
import GlobalStyle from '@/shared/styles/GlobalStyles';

// 이후 zustand로 관리 예정
const mode = 'dark';
const theme = mode == 'dark' ? dark : light;
export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
