'use client';

import { createPortal } from 'react-dom';
import { useMediaQuery } from '../model';
import styled, { keyframes } from 'styled-components';
import { useState } from 'react';

interface ResponsiveModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const slideDown = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
`;

const ModalLayout = ({ isOpen, onClose, children }: ResponsiveModalProps) => {
  const isMobile = useMediaQuery('(max-width: 744px)');
  const [isClosing, setIsClosing] = useState(false);
  if (!isOpen) return null;

  function handleClose() {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  }
  return createPortal(
    <Backdrop onClick={handleClose}>
      {isMobile ? (
        <BottomSheetContainer
          isClosing={isClosing}
          onClick={(e) => e.stopPropagation()}>
          {children}
        </BottomSheetContainer>
      ) : (
        <CenteredModalContainer onClick={(e) => e.stopPropagation()}>
          {children}
        </CenteredModalContainer>
      )}
    </Backdrop>,
    document.body,
  );
};

export default ModalLayout;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomSheetContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isClosing',
})<{ isClosing: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 80vh;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
  padding: 20px;
  overflow-y: auto;

  animation: ${({ isClosing }) => (isClosing ? slideDown : slideUp)} 0.3s ease;
`;

const CenteredModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 400px;
  max-height: 80vh;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 12px;
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 24px;
  overflow-y: auto;
`;
