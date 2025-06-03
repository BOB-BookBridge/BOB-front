'use client';

import styled from 'styled-components';
import {
  ControlsDesktop,
  ControlsMobile,
  ListingList,
} from '@/features/listing/ui';
import { FilterSidebar } from '@/features/listing/ui';

const Home = () => {
  return (
    <Container>
      <ControlsDesktop />
      <ControlsMobile />
      <div style={{ display: 'flex' }}>
        <FilterSidebar />
        <ListingList />
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin-right: 100px;
  @media (max-width: 744px) {
    margin-right: 0;
  }
`;

export default Home;
