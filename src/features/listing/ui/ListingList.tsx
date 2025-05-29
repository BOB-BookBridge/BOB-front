'use client';
import styled from 'styled-components';
import ListingCard from './ListingCard';
import { data } from '@/mocks/mockListingList';

const ListingList = () => {
  return (
    <Container>
      <ListWrapper>
        {data.map((listing, idx) => (
          <ListingCard key={listing.postId + idx} data={listing} />
        ))}
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
`;
