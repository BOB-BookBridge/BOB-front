'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  AIIcon,
  AIIconSm,
  BookIcon,
  ChatIcon,
  FABDefaultIcon,
} from '../assets/icons';
import { useTheme } from 'styled-components';
import { useThemeStore } from '../model';
import { colors } from '../constants';
import * as S from './FloatingButton.styles';

// #todo: isLogin zustand로 관리 예정
const isLogin = true;

const FloatingButton = () => {
  const mode = useThemeStore((state) => state.mode);
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const hideHeader =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/signup') ||
    pathname?.startsWith('/password') ||
    pathname?.startsWith('/listings/write');

  if (hideHeader) return null;

  const menuItems = [
    {
      icon: <AIIconSm />,
      label: 'AI 북메이트',
      href: '/ai',
    },
    {
      icon: <ChatIcon />,
      label: '채팅',
      onClick: handleClickChat,
    },
    {
      icon: <BookIcon />,
      label: '내 책 팔기',
      href: '/listings/write',
    },
  ];

  function handleClickAI() {
    router.push('/ai');
  }
  function handleClickChat() {}
  function handleClickToggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      {isOpen && <S.Overlay onClick={() => setIsOpen(false)} />}
      <S.Container>
        <S.IconWrapper
          mode={mode}
          onClick={isLogin ? handleClickToggle : handleClickAI}>
          {isLogin ? (
            <FABDefaultIcon
              stroke={colors.light.WHITE}
              strokeWidth={6}
              strokeLinecap='round'
            />
          ) : (
            <AIIcon fill={colors.light.WHITE} />
          )}
        </S.IconWrapper>

        {isOpen && (
          <S.MenuWrapper>
            {menuItems.map((item, idx) =>
              item.href ? (
                <Link
                  href={item.href}
                  key={idx}
                  passHref
                  style={{ textDecoration: 'none', color: theme.colors.BLACK }}>
                  <S.MenuItem>
                    <S.SmallIconWrapper>{item.icon}</S.SmallIconWrapper>
                    <span>{item.label}</span>
                  </S.MenuItem>
                </Link>
              ) : (
                <S.MenuItem key={idx} onClick={item.onClick}>
                  <S.SmallIconWrapper>{item.icon}</S.SmallIconWrapper>
                  <span>{item.label}</span>
                </S.MenuItem>
              ),
            )}
          </S.MenuWrapper>
        )}
      </S.Container>
    </>
  );
};

export default FloatingButton;
