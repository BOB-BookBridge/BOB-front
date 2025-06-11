import { useState } from 'react';
import MyTab from './MyTab';
import EditProfile from './EditProfile';
import MyFavorite from './MyFavorite';
import MyBook from './MyBook';
import styled from 'styled-components';

const My = () => {
  const [selected, setSelected] = useState(0);
  function handleClickTab(value: number) {
    setSelected(value);
  }
  return (
    <Container>
      <MyTab selected={selected} onClick={handleClickTab} />
      {selected === 0 ? (
        <EditProfile />
      ) : selected === 1 ? (
        <MyFavorite />
      ) : (
        <MyBook />
      )}
    </Container>
  );
};

export default My;

const Container = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;
