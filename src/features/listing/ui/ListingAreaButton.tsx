'use client';

import { useState } from 'react';
import { DropdownIconSm, PinIcon } from '@/shared/assets/icons';
import { colors } from '@/shared/constants';
import * as S from './ListingControls.styles';
import { ModalLayout } from '@/shared/ui';

const ListingAreaButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  function handleButtonToggle() {
    setIsOpen((prev) => !prev);
  }
  return (
    <div>
      <S.StyledButton onClick={handleButtonToggle}>
        <PinIcon />
        <p style={{ margin: 0 }}>선택안함</p>
        <DropdownIconSm fill={colors.light.BLACK} />
      </S.StyledButton>
      <ModalLayout isOpen={isOpen} onClose={handleButtonToggle}>
        <div>모달테스트입니다.</div>
      </ModalLayout>
    </div>
  );
};
export default ListingAreaButton;
