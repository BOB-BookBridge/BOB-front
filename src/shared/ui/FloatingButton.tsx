'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { AIIcon, FABDefaultIcon } from '../assets/icons';
import styled from 'styled-components';
import { colors } from '../constants';
import { useThemeStore } from '../model';

// #todo: isLogin zustand로 관리 예정
const isLogin = true;

const FloatingButton = () => {
  const mode = useThemeStore((state) => state.mode);
  const router = useRouter();
  const pathname = usePathname();
  const hideHeader =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/signup') ||
    pathname?.startsWith('/password') ||
    pathname?.startsWith('/listings/write');

  if (hideHeader) return null;

  function handleClickAI() {}

  function handleClickToggle() {}
  return (
    <Container>
      <IconWrapper
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
      </IconWrapper>
    </Container>
  );
};

export default FloatingButton;

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

interface IconWrapperProps {
  mode: 'dark' | 'light';
}
const IconWrapper = styled.div<IconWrapperProps>`
  background-color: ${({ theme }) => theme.colors.PRIMARY};
  width: 60px;
  height: 60px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 50px;
    height: 50px;
  }
`;
