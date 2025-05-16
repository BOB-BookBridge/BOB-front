'use client';

import styled from 'styled-components';
import { ListingList } from '@/shared/ui';
import {
  ListingSearchBar,
  FilterSidebar,
  ActiveFilterTag,
  SortSelector,
  FilterMenu,
  SelectArea,
} from '@/features/ui';

const Home = () => {
  return (
    <div>
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
    </div>
  );
};

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 200px;

  @media (max-width: 744px) {
    margin-left: 0;
  }
`;

export default Home;
