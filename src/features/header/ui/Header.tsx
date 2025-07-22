'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useRouter, usePathname } from 'next/navigation';
import { useMyStore } from '@/shared/model/useMyStore';
import { useThemeStore } from '../../../shared/model';
import { colors } from '../../../shared/constants';
import { useMyQuery } from '@/entities/user';
import Logo from '@/shared/assets/logo.svg';
import * as S from './Header.styles';
import {
  DarkModeIcon,
  LightModeIcon,
  NotiIcon,
  UserIcon,
} from '../../../shared/assets/icons';

const Header = () => {
  const mode = useThemeStore((state) => state.mode);
  const toggleMode = useThemeStore((state) => state.toggleMode);
  const { data, isLoading, isError } = useMyQuery();
  const isLogin = useMyStore((s) => s.isLogin);
  const { setIsLogin } = useMyStore();

  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const hideHeader =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/signup') ||
    pathname?.startsWith('/password') ||
    pathname?.startsWith('/chats/');

  useEffect(() => {
    setIsLogin(!isError && !!data?.memberId);
  }, [data, isError]);

  if (hideHeader) return null;

  return (
    <S.Container>
      <Link href='/'>
        <Logo width={60} />
      </Link>
      <S.RightSection>
        <div
          style={{
            display: 'flex',
            cursor: 'pointer',
          }}
          onClick={toggleMode}>
          {mode == 'dark' ? (
            <DarkModeIcon fill={colors.dark.PRIMARY} />
          ) : (
            <LightModeIcon fill={colors.dark.PRIMARY} />
          )}
        </div>
        {!isLoading && isLogin ? (
          <S.IconGroup>
            <Link
              href='/my'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <UserIcon
                stroke={theme.colors.BLACK}
                strokeWidth={2}
                fill='none'
              />
            </Link>
            <NotiIcon stroke={theme.colors.BLACK} strokeWidth={2} fill='none' />
          </S.IconGroup>
        ) : !isLoading && !isLogin ? (
          <S.LoginButton onClick={() => router.push('/login')}>
            로그인
          </S.LoginButton>
        ) : null}
      </S.RightSection>
    </S.Container>
  );
};

export default Header;
