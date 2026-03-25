import React from 'react';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import StyledComponentsRegistry from '@/shared/lib/StyledComponentsRegistry';
import ToastStyledContainer from '@/shared/styles/ToastStyledContainer';
import { Banner, NotificationWidget } from '@/features/notification/ui';
import { FloatingButton } from '@/features/floating-button/ui';
import { Header, AdminHeader } from '@/features/header/ui';
import { GlobalErrorBoundary } from '@/shared/lib';
import { ChatWidget } from '@/features/chat/ui';
import {
  LocalizationClientProvider,
  ReactQueryClientProvider,
  ThemeRegistry,
} from '@/shared/providers';

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
          <LocalizationClientProvider>
            <ReactQueryClientProvider>
              <ThemeRegistry>
                <GlobalErrorBoundary>
                  <AdminHeader />
                  <Header />
                  <Banner />
                  {children}
                  <FloatingButton />
                  <ChatWidget />
                  <NotificationWidget />
                  <ToastStyledContainer autoClose={1000} hideProgressBar />
                </GlobalErrorBoundary>
              </ThemeRegistry>
            </ReactQueryClientProvider>
          </LocalizationClientProvider>
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
