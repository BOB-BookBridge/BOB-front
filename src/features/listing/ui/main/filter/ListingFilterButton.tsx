'use client';

import styled from 'styled-components';
import { useRef, useState } from 'react';
import { BookStatus } from '@/entities/listing/types';
import { FilterIcon } from '@/shared/assets/icons';
import { Button, ModalLayout } from '@/shared/ui';
import { useFilterStore } from '../../../model';
import * as S from './ListingControls.styles';
import FilterContent from './FilterContent';

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
            <Button variant='cancel' text='초기화' onClick={handleReset} />

            <Button variant='primary' text='적용' onClick={handleApply} />
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
  gap: 10px;
  padding: 0 10px;
  justify-content: center;
`;
