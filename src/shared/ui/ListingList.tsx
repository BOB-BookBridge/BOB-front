'use client';
import styled from 'styled-components';
import ListingCard from './ListingCard';

const ListingList = () => {
  return (
    <Container>
      판매글 리스트
      <ListingCard />
    </Container>
  );
};

export default ListingList;
export const Container = styled.div`
  flex: 1;
`;
