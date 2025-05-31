'use client';

import { FilterIcon } from '@/shared/assets/icons';
import * as S from './ListingControls.styles';

const ListingFilterButton = () => {
  return (
    <S.StyledButton>
      <FilterIcon />
      <p style={{ margin: 0 }}>필터</p>
    </S.StyledButton>
  );
};
export default ListingFilterButton;
