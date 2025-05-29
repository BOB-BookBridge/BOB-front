'use client';

import styled from 'styled-components';
import { ListingList } from '@/features/listing/ui';
import {
  ListingSearchBar,
  FilterSidebar,
  ActiveFilterTag,
  SortSelector,
  FilterMenu,
  SelectArea,
} from '@/features/listing/ui';

const Home = () => {
  return (
    <Container>
      <ListingSearchBar />
      <ContentHeader>
        <div style={{ display: 'flex' }}>
          <FilterMenu />
          <SelectArea />
        </div>
        <ActiveFilterTag />
        <SortSelector />
      </ContentHeader>
      <div style={{ display: 'flex', marginTop: 20 }}>
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
const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 250px;

  @media (max-width: 744px) {
    margin-left: 0;
  }
`;

export default Home;
