'use client';

import styled from 'styled-components';
import { PostStatus, useListingQuery } from '@/entities/listing';
import { useFilterStore } from '@/features/listing/model';
import { useMyQuery } from '@/entities/user';
import ListingCard from './ListingCard';

const PAGE_SIZE = 12;
const ListingList = ({ isMyPage }: { isMyPage?: boolean }) => {
  const { data: myData } = useMyQuery();
  const memberId = myData?.memberId;
  const {
    key,
    keyword,
    emdId,
    isAvailableOnly,
    categoryId,
    bookStatus,
    priceRange,
    sort,
  } = useFilterStore();

  const filter = isMyPage
    ? { memberId, size: PAGE_SIZE }
    : {
        key: key && keyword ? key : undefined,
        keyword: keyword ?? undefined,
        emdId: emdId ?? undefined,
        categoryId: categoryId ?? undefined,
        bookStatus: bookStatus ?? undefined,
        price: priceRange ?? undefined,
        postStatus: isAvailableOnly ? ('READY' as PostStatus) : undefined,
        sort,
        size: PAGE_SIZE,
      };

  const { data, fetchNextPage, hasNextPage } = useListingQuery(filter);
  const listings = data?.pages.flatMap((page) => page.posts) ?? [];
  console.log(listings);
  function handleLoadMore() {
    fetchNextPage();
  }

  return (
    <Container>
      {listings.length === 0 ? (
        <EmptyMessage>판매글이 없습니다.</EmptyMessage>
      ) : (
        <ListWrapper>
          {listings.map((listing) => (
            <ListingCard key={`listing-${listing.postId}`} data={listing} />
          ))}

          {hasNextPage && (
            <MoreButton onClick={handleLoadMore}>더보기</MoreButton>
          )}
        </ListWrapper>
      )}
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
export const EmptyMessage = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.GRAY_600};
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
