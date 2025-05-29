'use client';
import styled from 'styled-components';
import ListingCard from './ListingCard';
import { data } from '@/mocks/mockListingList';

const ListingList = () => {
  return (
    <Container>
      판매글 리스트
      {data.map((listing, idx) => (
        <ListingCard key={listing.postId + idx} data={listing} />
      ))}
    </Container>
  );
};

export default ListingList;
export const Container = styled.div`
  flex: 1;
`;
