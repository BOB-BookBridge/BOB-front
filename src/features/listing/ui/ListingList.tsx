'use client';
import { useState } from 'react';
import styled from 'styled-components';
import ListingCard from './ListingCard';
import { data } from '@/mocks/mockListingList';

const PAGE_SIZE = 12;
const ListingList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const visibleData = data.slice(0, (currentPage + 1) * PAGE_SIZE);

  console.log(visibleData.length, data.length);
  const hasMore = visibleData.length < data.length;

  console.log(hasMore);
  function handleLoadMore() {
    setCurrentPage((prev) => prev + 1);
  }

  return (
    <Container>
      <ListWrapper>
        {visibleData.map((listing, idx) => (
          <ListingCard key={listing.postId + idx} data={listing} />
        ))}
        {hasMore && <MoreButton onClick={handleLoadMore}>더보기</MoreButton>}
      </ListWrapper>
    </Container>
  );
};

export default ListingList;
export const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const MoreButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.GRAY_300};
  border: none;
  border-radius: 15px;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.BLACK};
  cursor: pointer;
`;
