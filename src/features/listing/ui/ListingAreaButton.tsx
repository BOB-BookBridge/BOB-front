'use client';

import { DropdownIconSm, PinIcon } from '@/shared/assets/icons';
import { colors } from '@/shared/constants';
import * as S from './ListingControls.styles';

const ListingAreaButton = () => {
  return (
    <S.StyledButton>
      <PinIcon />
      <p style={{ margin: 0 }}>선택안함</p>
      <DropdownIconSm fill={colors.light.BLACK} />
    </S.StyledButton>
  );
};
export default ListingAreaButton;
