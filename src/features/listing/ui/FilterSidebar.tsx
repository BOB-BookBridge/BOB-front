'use client';
import styled from 'styled-components';
import { useFilterStore } from '../model';
import FilterContentControl from './FilterContentControl';
import { colors } from '@/shared/constants';

const FilterSideBar = () => {
  const isAvailableOnly = useFilterStore((state) => state.isAvailableOnly);
  const categoryId = useFilterStore((state) => state.categoryId);
  const bookStatus = useFilterStore((state) => state.bookStatus);
  const priceRange = useFilterStore((state) => state.priceRange);
  const {
    toggleIsAvailableOnly,
    setCategoryId,
    setBookStatus,
    setPriceRange,
    resetFilters,
  } = useFilterStore();

  return (
    <Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          padding: 10,
        }}>
        <p style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>필터</p>
        <span
          onClick={resetFilters}
          style={{
            color: colors.light.GRAY_500,
            textDecoration: 'underline',
            cursor: 'pointer',
          }}>
          초기화
        </span>
      </div>
      <FilterContentControl
        isAvailableOnly={isAvailableOnly}
        categoryId={categoryId}
        bookStatus={bookStatus}
        priceStatus={priceRange}
        onClickTradeStatus={toggleIsAvailableOnly}
        onClickCategory={setCategoryId}
        onClickBookStatus={setBookStatus}
        onClickPrice={setPriceRange}
        onClickReset={resetFilters}
      />
    </Container>
  );
};

export default FilterSideBar;

const Container = styled.aside`
  width: 250px;
  @media (max-width: 744px) {
    display: none;
  }
`;
