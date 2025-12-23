import styled, { css, keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ theme }) => theme.zIndex.fabOverlay};
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  padding: 10px;
  z-index: ${({ theme }) => theme.zIndex.fab};
  flex-direction: column;
  align-items: flex-end;
`;

export const Noti = styled.div<{ $dismiss: boolean }>`
  position: absolute;
  bottom: 100%;
  right: 0;
  padding: 10px;
  border-radius: 15px;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${({ theme }) => theme.colors.GRAY_200};
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${({ $dismiss }) =>
    $dismiss
      ? css`
          ${fadeOut} 0.3s ease-in forwards
        `
      : css`
          ${fadeInUp} 0.2s ease-out forwards
        `};

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_300};
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.15);
  }
`;

interface IconWrapperProps {
  $isOpen: boolean;
}
export const IconWrapper = styled.div<IconWrapperProps>`
  position: relative;
  background-color: ${({ $isOpen, theme }) =>
    $isOpen ? theme.colors.WHITE : theme.colors.PRIMARY};
  width: 60px;
  height: 60px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 50px;
    height: 50px;
  }
`;

export const MenuWrapper = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.colors.WHITE};
  width: 160px;
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  border-radius: 20px;
  margin-bottom: 10px;
`;

export const MenuItem = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  padding: 10px 10px;
  border-radius: 10px;
  &:hover {
    background: ${({ theme }) => theme.colors.GRAY_300};
  }
`;

export const SmallIconWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.PRIMARY};
  width: 25px;
  height: 25px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
