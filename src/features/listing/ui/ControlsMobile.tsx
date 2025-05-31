'use client';
import styled from 'styled-components';
import ListingFilterButton from './ListingFilterButton';
import ListingSortDropdown from './ListingSortDropdown';
import ListingAreaButton from './ListingAreaButton';
import ListingSearchBar from './ListingSearchBar';

const ControlsMobile = () => {
  return (
    <Container>
      <ListingSearchBar />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <ListingFilterButton />
          <ListingAreaButton />
        </div>
        <ListingSortDropdown />
      </div>
    </Container>
  );
};
export default ControlsMobile;

const Container = styled.div`
  padding: 10px;
  @media (min-width: 744px) {
    display: none;
  }
`;
