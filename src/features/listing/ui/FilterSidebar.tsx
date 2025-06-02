'use client';
import styled from 'styled-components';
import { useFilterStore } from '../model';
import FilterContentControl from './FilterContentControl';

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
      <p style={{ fontSize: 20, fontWeight: 600, margin: 10 }}>필터</p>
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
