'use client';
import styled from 'styled-components';
import ListingSortDropdown from './ListingSortDropdown';
import ListingAreaButton from './ListingAreaButton';
import ListingSearchBar from './ListingSearchBar';
import ActiveFilterTag from './ActiveFilterTag';

const ControlsDesktop = () => {
  return (
    <Container>
      <TopWrapper>
        <ListingAreaButton /> <ListingSearchBar />
      </TopWrapper>
      <BottomWrapper>
        <ActiveFilterTag />
        <ListingSortDropdown />
      </BottomWrapper>
    </Container>
  );
};
export default ControlsDesktop;

const Container = styled.div`
  @media (max-width: 744px) {
    display: none;
  }
`;

const TopWrapper = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-left: 100px;
`;

const BottomWrapper = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-left: 250px;
`;
