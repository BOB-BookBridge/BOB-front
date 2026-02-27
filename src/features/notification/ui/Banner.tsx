'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styled, { keyframes } from 'styled-components';
import { useBannerNoticeQuery } from '@/entities/admin/announcements';
import { CloseIcon } from '@/shared/assets/icons';

const Banner = () => {
  const { data } = useBannerNoticeQuery();
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!data) return;
    const key = `banner-dismissed-${data.content.slice(0, 20)}-${data.endTime ?? 'no-end'}`;
    const dismissed = sessionStorage.getItem(key);
    if (!dismissed) setVisible(true);
  }, [data]);

  if (!visible || !data) return null;

  const message = `${data.title}  ${data.content}`;

  function handleClose() {
    if (!data) return;
    const key = `banner-dismissed-${data.content.slice(0, 20)}-${data.endTime ?? 'no-end'}`;
    sessionStorage.setItem(key, 'true');
    setVisible(false);
  }

  const hideBanner =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/signup') ||
    pathname?.startsWith('/password') ||
    pathname?.startsWith('/chats/') ||
    pathname?.startsWith('/error') ||
    pathname?.startsWith('/403') ||
    pathname?.startsWith('/admin');

  if (!data || hideBanner) return;

  return (
    <BannerWrap role='alert' aria-live='assertive'>
      <Inner>
        <Dot />
        <MarqueeOuter>
          <MarqueeText>{message}</MarqueeText>
        </MarqueeOuter>
        <CloseIcon onClick={handleClose} />
      </Inner>
    </BannerWrap>
  );
};
export default Banner;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.35; }
`;

const scroll = keyframes`
  0%   { transform: translateX(100vw); }
  100% { transform: translateX(-100%); }
`;

const BannerWrap = styled.div`
  margin: 0 10px 10px 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.GRAY_200};
  color: ${({ theme }) => theme.colors.SECONDARY};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 24px;
  min-height: 40px;
  box-sizing: border-box;

  svg {
    cursor: pointer;
    fill: ${({ theme }) => theme.colors.GRAY_500};
    &:hover {
      fill: ${({ theme }) => theme.colors.GRAY_700};
    }
  }
`;

const Dot = styled.span`
  flex-shrink: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.SECONDARY};
  animation: ${pulse} 1.4s ease-in-out infinite;
`;

const MarqueeOuter = styled.div`
  flex: 1;
  height: 40px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const MarqueeText = styled.span`
  position: absolute;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 600;
  opacity: 0.92;
  animation: ${scroll} 16s linear infinite;
`;
