import React from 'react';
import localFont from 'next/font/local';
import StyledComponentsRegistry from '@/shared/lib/StyledComponentsRegistry';
import ThemeRegistry from '@/shared/providers/ThemeRegistry';
import { Header } from '@/shared/ui';
import { Metadata } from 'next';

const pretendard = localFont({
  src: '../shared/assets/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '300 400 500 600 700',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.variable}`} suppressHydrationWarning>
        <StyledComponentsRegistry>
          <ThemeRegistry>
            <Header />
            {children}
          </ThemeRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'BOOK BRIDGE | BOB',
  description: '중고책 거래를 통해 사람과 책을 잇는 플랫폼, BOOK BRIDGE입니다.',
  icons: {
    icon: '/logo.png',
  },
};
