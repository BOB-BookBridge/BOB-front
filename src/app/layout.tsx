import React from 'react';
import localFont from 'next/font/local';
import StyledComponentsRegistry from '@/shared/lib/StyledComponentsRegistry';
import ThemeRegistry from '@/shared/providers/ThemeRegistry';

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
          <ThemeRegistry>{children}</ThemeRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
