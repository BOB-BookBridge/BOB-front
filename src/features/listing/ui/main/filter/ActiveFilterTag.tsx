'use client';
import styled from 'styled-components';
import { useFilterStore } from '../../../model';
import { getCategoryNameById } from '../../../lib';
import { bookStatusMap, priceRangeMap } from '@/shared/lib';

const ActiveFilterTag = () => {
  const isAvailableOnly = useFilterStore((state) => state.isAvailableOnly);
  const categoryId = useFilterStore((state) => state.categoryId);
  const bookStatus = useFilterStore((state) => state.bookStatus);
  const priceRange = useFilterStore((state) => state.priceRange);

  const { toggleIsAvailableOnly, setCategoryId, setBookStatus, setPriceRange } =
    useFilterStore();
  return (
    <Container>
      {isAvailableOnly && <Tag onClick={toggleIsAvailableOnly}>판매중</Tag>}
      {categoryId !== null && (
        <Tag onClick={() => setCategoryId(null)}>
          {getCategoryNameById(categoryId)}
        </Tag>
      )}
      {bookStatus !== null && (
        <Tag onClick={() => setBookStatus(null)}>
          {bookStatusMap[bookStatus]}
        </Tag>
      )}
      {priceRange !== null && (
        <Tag onClick={() => setPriceRange(null)}>
          {priceRangeMap[priceRange]}
        </Tag>
      )}
    </Container>
  );
};
export default ActiveFilterTag;

const Container = styled.div`
  flex: 1;
  height: 40px;
  display: flex:
  align-items:center;

  @media (max-width: 744px) {
    display: none;
  }
`;

const Tag = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  margin: 5px;
  cursor: pointer;
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.BLACK};
  color: ${({ theme }) => theme.colors.WHITE};
`;
