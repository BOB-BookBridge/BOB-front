import styled, { css, keyframes } from 'styled-components';

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const slideDown = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
`;

export const Backdrop = styled.div<{ $isOnlyMobile: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndex.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $isOnlyMobile, theme }) =>
    $isOnlyMobile
      ? `@media(min-width: ${theme.breakpoints.tablet}){display: none;}`
      : ''}
`;

export const ModalContainer = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 600px;
  min-height: 35vh;
  max-height: 80vh;
  border-radius: 12px;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.colors.WHITE};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 20px 0;
  z-index: ${({ theme }) => theme.zIndex.modal};

  @media (max-width: 744px) {
    top: auto;
    left: 0;
    transform: none;
    width: 100%;
    border-radius: 20px 20px 0 0;
    bottom: 0;
    z-index: ${({ theme }) => theme.zIndex.modal};
    animation: ${({ $isClosing }) =>
      $isClosing
        ? css`
            ${slideDown} 0.3s ease
          `
        : css`
            ${slideUp} 0.3s ease
          `};
  }

  scrollbar-width: none;

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 20px;
`;

export const Title = styled.span`
  font-weight: 600;
  font-size: 20px;
`;

export const ChildrenWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 30px;
`;
