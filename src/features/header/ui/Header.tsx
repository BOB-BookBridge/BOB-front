'use client';

import Link from 'next/link';
import { useTheme } from 'styled-components';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const { data, isPending, isError } = useMyQuery();
  const isLogin = useMyStore((s) => s.isLogin);
  const { setIsLogin } = useMyStore();
  const [visibleNoti, setVisibleNoti] = useState<null | string>(null);
  const [dismissing, setDismissing] = useState<boolean>(false);
  const [blink, setBlink] = useState(false);
  const timers = useRef<{ fade?: number; clear?: number }>({});

  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const hideHeader =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/signup') ||
    pathname?.startsWith('/password') ||
    pathname?.startsWith('/chats/') ||
    pathname?.startsWith('/error');

  const onNoti = useCallback((newNoti: string) => {
    clearTimeout(timers.current.fade);
    clearTimeout(timers.current.clear);

    setVisibleNoti(newNoti);
    setDismissing(false);

    timers.current.fade = window.setTimeout(() => {
      setDismissing(true);
      setBlink(false);
    }, 2500);

    timers.current.clear = window.setTimeout(() => {
      setVisibleNoti(null);
      setBlink(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const loginTmp = !isError && !!data?.memberId;
    setIsLogin(loginTmp);
    if (loginTmp && !data.area.isAuthentication) {
      onNoti('활동 지역 갱신이 필요합니다.');
      setBlink(true);
    }
  }, [data, isError, onNoti, setIsLogin]);

  if (hideHeader) return null;

  return (
    <S.Container>
      <Link
        href='/'
        onClick={() => sessionStorage.removeItem('my-tab-selected')}>
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
        {!isPending && isLogin ? (
          <S.IconGroup>
            <Link
              href='/my'
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {blink ? (
                <S.BlinkingWrap>
                  <UserIcon strokeWidth={2} fill='none' />
                </S.BlinkingWrap>
              ) : (
                <UserIcon
                  stroke={theme.colors.BLACK}
                  strokeWidth={2}
                  fill='none'
                />
              )}
            </Link>
            <NotiIcon stroke={theme.colors.BLACK} strokeWidth={2} fill='none' />
          </S.IconGroup>
        ) : !isPending && !isLogin ? (
          <S.LoginButton onClick={() => router.push('/login')}>
            로그인
          </S.LoginButton>
        ) : null}
        {visibleNoti && <S.Noti $dismiss={dismissing}>{visibleNoti}</S.Noti>}
      </S.RightSection>
    </S.Container>
  );
};

export default Header;
