'use client';

import Link from 'next/link';
import { useTheme } from 'styled-components';
import { useRouter, usePathname } from 'next/navigation';
import { useFABStore, useThemeStore, useHandleOpenChat } from '../model';
import { useMyStore } from '../model/useMyStore';
import { useUnreadQuery } from '@/entities/chat';
import * as S from './FloatingButton.styles';
import { colors } from '../constants';
import Badge from './Badge';
import {
  AIIcon,
  AIIconSm,
  BookIcon,
  ChatIcon,
  CloseIcon,
  FABDefaultIcon,
} from '../assets/icons';

const FloatingButton = () => {
  const mode = useThemeStore((state) => state.mode);
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = useFABStore((s) => s.isOpen);
  const { toggleIsOpen, resetChat, resetAll } = useFABStore();
  const handleOpenChat = useHandleOpenChat();
  const isLogin = useMyStore((s) => s.isLogin);
  const { data: unRead } = useUnreadQuery();
  const unReadCount = unRead ? unRead.unreadCount : 0;

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
      onClick: (e: React.MouseEvent) => handleOpenChat({ e }),
      badge: unReadCount > 0 ? unReadCount : undefined,
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

  function handleClickToggle() {
    if (isOpen) resetChat();
    toggleIsOpen();
  }
  function handleClose() {
    resetAll();
  }
  return (
    <>
      {isOpen && <S.Overlay onClick={handleClose} />}
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
                <S.MenuItem
                  key={idx}
                  onClick={(e) => {
                    item.onClick?.(e);
                  }}>
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
