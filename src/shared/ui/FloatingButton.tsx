'use client';

import Link from 'next/link';
import { useTheme } from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
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

interface Sender {
  id: string;
  nickname: string;
  profile: string | null;
}
interface NotiType {
  type: 'CHAT' | 'TRADE';
  refId: number;
  body: string;
  sender: Sender | null;
  sentAt: string;
}
const FloatingButton = () => {
  const mode = useThemeStore((state) => state.mode);
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = useFABStore((s) => s.isOpen);
  const { toggleIsOpen, resetChat, resetAll } = useFABStore();
  const handleOpenChat = useHandleOpenChat();
  const isLogin = useMyStore((s) => s.isLogin);
  const { data: unRead } = useUnreadQuery(isLogin);
  const unReadCount = unRead ? unRead.unreadCount : 0;

  const [visibleNoti, setVisibleNoti] = useState<NotiType | null>(null);
  const [dismissing, setDismissing] = useState<boolean>(false);
  const timers = useRef<{ fade?: number; clear?: number }>({});

  const onNoti = useCallback((newNoti: NotiType) => {
    clearTimeout(timers.current.fade);
    clearTimeout(timers.current.clear);

    setVisibleNoti(newNoti);
    setDismissing(false);

    timers.current.fade = window.setTimeout(() => {
      setDismissing(true);
    }, 2500);

    timers.current.clear = window.setTimeout(() => {
      setVisibleNoti(null);
    }, 3000);
  }, []);

  const noti = {
    type: 'CHAT' as const,
    refId: 1,
    body: '메시지만 보낼래',
    sender: {
      id: '0197f9e2-7654-7e9a-98dc-70e7fd1a69b9',
      nickname: 'manager',
      profile: null,
    },
    sentAt: '2025-07-13T03:39:41.978509',
  };

  useEffect(() => {
    onNoti(noti);
  }, []);

  const hideButton =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/signup') ||
    pathname?.startsWith('/password') ||
    pathname?.startsWith('/listings/write') ||
    pathname?.startsWith('/chats') ||
    pathname?.startsWith('/ai');
  if (hideButton) return null;

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
        {visibleNoti && (
          <S.Noti $dismiss={dismissing}>
            {noti.type === 'CHAT'
              ? `${noti.sender.nickname}: ${noti.body}`
              : noti.body}
          </S.Noti>
        )}
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
