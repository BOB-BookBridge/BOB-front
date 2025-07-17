'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  AIIcon,
  AIIconSm,
  BookIcon,
  ChatIcon,
  CloseIcon,
  FABDefaultIcon,
} from '../assets/icons';
import { useTheme } from 'styled-components';
import { useChatWidgetStore, useIsMobile, useThemeStore } from '../model';
import * as S from './FloatingButton.styles';
import { colors } from '../constants';
import Badge from './Badge';

// #todo: isLogin zustand로 관리 예정
const isLogin = true;
const unReadCount = 199;

const FloatingButton = () => {
  const mode = useThemeStore((state) => state.mode);
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const chatIsOpen = useChatWidgetStore((s) => s.isOpen);
  const { setIsOpen: setChatIsOpen } = useChatWidgetStore();

  const hideHeader =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/signup') ||
    pathname?.startsWith('/password') ||
    pathname?.startsWith('/listings/write') ||
    pathname?.startsWith('/chats');
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
      badge: unReadCount,
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

  function handleClickChat() {
    if (isMobile) {
      router.push('/chats');
    } else {
      setChatIsOpen(true);
    }
  }

  function handleClickToggle() {
    setIsOpen((prev) => !prev);
    if (chatIsOpen) setChatIsOpen(false);
  }

  return (
    <>
      {isOpen && <S.Overlay onClick={() => setIsOpen(false)} />}
      <S.Container onClick={isLogin ? handleClickToggle : handleClickAI}>
        <S.IconWrapper mode={mode} $isOpen={isOpen}>
          {isLogin ? (
            isOpen ? (
              <CloseIcon fill={theme.colors.BLACK} />
            ) : (
              <FABDefaultIcon
                stroke={colors.light.WHITE}
                strokeWidth={6}
                strokeLinecap='round'
              />
            )
          ) : (
            <AIIcon fill={colors.light.WHITE} />
          )}
          {!isOpen && unReadCount > 0 && (
            <Badge type='fab' unReadCount={unReadCount} />
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
                  {item.badge !== undefined && (
                    <Badge unReadCount={item.badge} />
                  )}
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
