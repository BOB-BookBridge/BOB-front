'use client';

import Link from 'next/link';
import { useTheme } from 'styled-components';
import { useRouter, usePathname } from 'next/navigation';
import Logo from '@/shared/assets/logo.svg';
import { useThemeStore } from '../model';
import { colors } from '../constants';
import * as S from './Header.styles';
import {
  DarkModeIcon,
  LightModeIcon,
  NotiIcon,
  UserIcon,
} from '../assets/icons';

// #todo: isLogin zustand로 관리 예정
const isLogin = true;

const Header = () => {
  const { mode, toggleMode } = useThemeStore();
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const hideHeader =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/signup') ||
    pathname?.startsWith('/password');

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
        {isLogin ? (
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
        ) : (
          <S.LoginButton onClick={() => router.push('/login')}>
            로그인
          </S.LoginButton>
        )}
      </S.RightSection>
    </S.Container>
  );
};

export default Header;
