'use client';
import styled from 'styled-components';
import ListingFilterButton from './filter/ListingFilterButton';
import ListingSortDropdown from './filter/ListingSortDropdown';
import ListingAreaButton from './filter/ListingAreaButton';
import ListingSearchBar from './filter/ListingSearchBar';

const ControlsMobile = () => {
  return (
    <Container>
      <ListingSearchBar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
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
