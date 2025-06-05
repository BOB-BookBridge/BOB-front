'use client';

import { FilterIcon } from '@/shared/assets/icons';
import * as S from './ListingControls.styles';
import { ModalLayout } from '@/shared/ui';
import { useRef, useState } from 'react';
import FilterContent from './FilterContent';
import { BookStatus } from '@/entities/listing/model/types';
import styled from 'styled-components';
import { useFilterStore } from '../../../model';
import { colors } from '@/shared/constants';

export interface FilterStatus {
  isAvailableOnly: boolean;
  categoryId: number | null;
  bookStatus: BookStatus | null;
  priceRange: number | null;
}
const ListingFilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAvailableOnly = useFilterStore((state) => state.isAvailableOnly);
  const categoryId = useFilterStore((state) => state.categoryId);
  const bookStatus = useFilterStore((state) => state.bookStatus);
  const priceRange = useFilterStore((state) => state.priceRange);
  const { setIsAvailableOnly, setCategoryId, setBookStatus, setPriceRange } =
    useFilterStore();

  const filterRef = useRef<{
    getFilter: () => FilterStatus;
    resetFilter: () => void;
  }>(null);

  function handleModalToggle() {
    setIsOpen((prev) => !prev);
  }

  function handleApply() {
    const filter = filterRef.current?.getFilter();
    if (!filter) return;

    const { isAvailableOnly, categoryId, bookStatus, priceRange } = filter;

    if (isAvailableOnly !== undefined) setIsAvailableOnly(isAvailableOnly);
    if (categoryId !== undefined) setCategoryId(categoryId);
    if (bookStatus !== undefined) setBookStatus(bookStatus);
    if (priceRange !== undefined) setPriceRange(priceRange);

    setIsOpen(false);
  }

  function handleReset() {
    filterRef.current?.resetFilter();
  }

  const activeFilterCount =
    (isAvailableOnly ? 1 : 0) +
    (categoryId !== null ? 1 : 0) +
    (bookStatus !== null ? 1 : 0) +
    (priceRange !== null ? 1 : 0);

  return (
    <S.StyledButton onClick={handleModalToggle}>
      <FilterIcon />
      <p style={{ margin: 0 }}>
        필터 {activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
      </p>
      {isOpen && (
        <ModalLayout
          isOpen={isOpen}
          title={'필터'}
          onClose={() => setIsOpen(false)}
          isOnlyMobile={true}>
          <FilterContent
            isAvailableOnly={isAvailableOnly}
            categoryId={categoryId}
            bookStatus={bookStatus}
            priceStatus={priceRange}
            ref={filterRef}
          />
          <ButtonWrapper>
            <Button $type='RESET' onClick={handleReset}>
              초기화
            </Button>
            <Button $type='APPLY' onClick={handleApply}>
              적용
            </Button>
          </ButtonWrapper>
        </ModalLayout>
      )}
    </S.StyledButton>
  );
};

export default ListingFilterButton;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
`;
const Button = styled.div<{ $type: 'RESET' | 'APPLY' }>`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
  border-radius: 10px;
  margin: 10px;
  ${({ $type, theme }) =>
    `background-color: ${$type === 'APPLY' ? theme.colors.PRIMARY : colors.light.GRAY_500};
     color: ${$type === 'APPLY' ? colors.light.WHITE : colors.light.GRAY_200};`}
`;
