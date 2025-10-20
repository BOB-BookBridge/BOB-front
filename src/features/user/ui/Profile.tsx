import { useState } from 'react';

import SubTab from './SubTab';
import styled from 'styled-components';
import MyInfo from './profile/MyInfo';
import Bookcase from './profile/Bookcase';
import WishList from './profile/Wishlist';

const Profile = () => {
  const tabs = ['내 정보', '책장', '희망 도서'];
  const [selectedSubTab, setSelectedSubTab] = useState(0);

  function handleChangeSubTab(v: number) {
    setSelectedSubTab(v);
  }
  return (
    <Container>
      <SubTab
        tabs={tabs}
        selected={selectedSubTab}
        onChange={handleChangeSubTab}
      />
      {selectedSubTab === 0 ? (
        <MyInfo />
      ) : selectedSubTab === 1 ? (
        <Bookcase />
      ) : (
        <WishList />
      )}
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0;
  }
`;
