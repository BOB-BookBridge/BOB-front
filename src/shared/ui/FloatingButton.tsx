'use client';

import Link from 'next/link';
import { useTheme } from 'styled-components';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useFABStore,
  useThemeStore,
  useHandleOpenWidget,
  useWidgetStore,
} from '../model';
import { connectNoti, Notification } from '../model/connectNoti';
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
  InquiryIcon,
} from '../assets/icons';
import ModalLayout from './ModalLayout';
import InquiryContents from './InquiryContents';

const FloatingButton = () => {
  const mode = useThemeStore((state) => state.mode);
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = useFABStore((s) => s.isOpen);
  const { toggleIsOpen, resetChat, resetAll } = useFABStore();
  const { setActiveWidget } = useWidgetStore();
  const handleOpenWidget = useHandleOpenWidget();
  const isLogin = useMyStore((s) => s.isLogin);
  const { data: unRead, refetch: unReadRefetch } = useUnreadQuery(isLogin);
  const unReadCount = unRead ? unRead.unreadCount : 0;
  const [visibleNoti, setVisibleNoti] = useState<Notification | null>(null);
  const [dismissing, setDismissing] = useState<boolean>(false);
  const [isOpenInquiry, setIsOpenInquiry] = useState(false);
  const timers = useRef<{ fade?: number; clear?: number }>({});

  const onNoti = useCallback(
    (newNoti: Notification) => {
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

      unReadRefetch();
    },
    [unReadRefetch],
  );

  useEffect(() => {
    if (!isLogin) return;
    const es = connectNoti(onNoti, () => {
      console.log('error');
    });
    return () => {
      es.close();
    };
  }, [isLogin, onNoti]);

  const hideButton =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/signup') ||
    pathname?.startsWith('/password') ||
    pathname?.startsWith('/listings/write') ||
    pathname?.startsWith('/chats') ||
    pathname?.startsWith('/ai') ||
    pathname?.startsWith('/error');

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
      onClick: (e: React.MouseEvent) => handleOpenWidget({ e, type: 'chat' }),
      badge: unReadCount > 0 ? unReadCount : undefined,
    },
    {
      icon: <BookIcon />,
      label: '내 책 팔기',
      href: '/listings/write',
    },
    {
      icon: (
        <InquiryIcon
          fill='none'
          stroke={colors.light.WHITE}
          strokeWidth={2.5}
        />
      ),
      label: '문의하기',
      onClick: () => setIsOpenInquiry(true),
    },
  ];

  function handleClickAI() {
    router.push('/ai');
  }

  function handleClickToggle() {
    if (isOpen) {
      resetChat();
      setActiveWidget(null);
    }
    toggleIsOpen();
  }

  function handleClose() {
    resetAll();
    setActiveWidget(null);
  }

  function handleNoti() {
    if (!visibleNoti) return;
    handleOpenWidget({ chatId: visibleNoti.refId, type: 'chat' });
  }
  return (
    <>
      {isOpen && <S.Overlay onClick={handleClose} />}
      <S.Container onClick={isLogin ? handleClickToggle : handleClickAI}>
        {visibleNoti && (
          <S.Noti $dismiss={dismissing} onClick={handleNoti}>
            {visibleNoti.type === 'CHAT' && visibleNoti.sender
              ? `${visibleNoti.sender.nickname}: ${visibleNoti.body}`
              : visibleNoti.body}
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
        {isOpenInquiry && (
          <ModalLayout
            isOpen={isOpenInquiry}
            title='문의하기'
            onClose={() => setIsOpenInquiry(false)}>
            <InquiryContents onClose={() => setIsOpenInquiry(false)} />
          </ModalLayout>
        )}
      </S.Container>
    </>
  );
};

export default FloatingButton;
