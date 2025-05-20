'use client';
import {
  DarkModeIcon,
  LightModeIcon,
  NotiIcon,
  UserIcon,
} from '../assets/icons';

import * as S from './Header.styles';
import { colors } from '../constants';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'styled-components';
// zustand로 관리 예정
const isLogin = false;
const mode = 'dark';

const Header = () => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const hideHeader =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('signup') ||
    pathname?.startsWith('password');

  if (hideHeader) return null;
  return (
    <S.Container>
      <S.Logo src='/logo-withoutletter.svg' alt='Logo' />
      <S.RightSection>
        {mode == 'dark' ? (
          <DarkModeIcon fill={colors.dark.PRIMARY} />
        ) : (
          <LightModeIcon fill={colors.dark.PRIMARY} />
        )}
        {isLogin ? (
          <S.IconGroup>
            <UserIcon stroke={theme.colors.BLACK} strokeWidth={2} fill='none' />
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
