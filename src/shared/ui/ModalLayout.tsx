'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from 'styled-components';
import { useMediaQuery } from '../model';
import { CloseIcon } from '../assets/icons';
import * as S from './ModalLayout.styles';

interface ResponsiveModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

const ModalLayout = ({
  isOpen,
  onClose,
  title,
  children,
}: ResponsiveModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 744px)');
  const [isClosing, setIsClosing] = useState(false);
  if (!isOpen) return null;

  function handleClose() {
    setIsClosing(true);
    if (isMobile) {
      setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 300);
    } else onClose();
  }

  return createPortal(
    <S.Backdrop onClick={handleClose}>
      <div>
        <S.ModalContainer
          $isClosing={isMobile ? isClosing : false}
          className={isMobile && isClosing ? 'closing' : ''}
          onClick={(e) => e.stopPropagation()}>
          <S.HeaderWrapper>
            <S.Title>{title}</S.Title>
            <CloseIcon
              onClick={handleClose}
              style={{ cursor: 'pointer', fill: theme.colors.BLACK }}
            />
          </S.HeaderWrapper>
          <S.ChildrenWrapper>{children}</S.ChildrenWrapper>
        </S.ModalContainer>
      </div>
    </S.Backdrop>,
    document.body,
  );
};

export default ModalLayout;
