'use client';

import styled from 'styled-components';
import {
  PostStatus,
  useFavoritesQuery,
  useListingQuery,
} from '@/entities/listing';
import { useFilterStore } from '@/features/listing/model';
import { LoadingIndicator } from '@/shared/ui';
import { useMyQuery } from '@/entities/user';
import ListingCard from './ListingCard';

const PAGE_SIZE = 12;
const ListingList = ({
  isUserPage,
  isFavorite,
  id,
}: {
  isUserPage?: boolean;
  isFavorite?: boolean;
  id?: string;
}) => {
  const { data: myData } = useMyQuery();
  const memberId = id ? id : myData?.memberId;
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

  const filter = isUserPage
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

  const {
    data: listingData,
    fetchNextPage: fetchListingNext,
    hasNextPage: hasListingNext,
    isPending: isListingPending,
    isError: isListingError,
  } = useListingQuery(filter);

  const {
    data: favoriteData,
    fetchNextPage: fetchFavoriteNext,
    hasNextPage: hasFavoriteNext,
    isPending: isFavoritePending,
    isError: isFavoriteError,
  } = useFavoritesQuery(isFavorite ? true : false);

  const data = isFavorite ? favoriteData : listingData;
  const fetchNextPage = isFavorite ? fetchFavoriteNext : fetchListingNext;
  const hasNextPage = isFavorite ? hasFavoriteNext : hasListingNext;
  const isPending = isFavorite ? isFavoritePending : isListingPending;
  const isError = isFavorite ? isFavoriteError : isListingError;

  const listings = data?.pages.flatMap((page) => page.posts) ?? [];
  function handleLoadMore() {
    fetchNextPage();
  }

  return (
    <Container>
      {isPending ? (
        <LoadingIndicator text='불러오는중' />
      ) : isError ? (
        <></>
      ) : listings.length === 0 ? (
        <EmptyMessage>
          판매글이 없습니다.
          <br />
          판매글을 올려 보세요!
        </EmptyMessage>
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
  height: 90%;
`;
export const EmptyMessage = styled.div`
  text-align: center;
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
