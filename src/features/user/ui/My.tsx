'use client';

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import EditProfile from './EditProfile';
import MyFavorite from './MyFavorite';
import MyBook from './MyBook';
import MyTab from './MyTab';

const SESSION_KEY = 'my-tab-selected';

const My = () => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored !== null) {
      setSelected(Number(stored));
    }
  }, []);

  function handleClickTab(value: number) {
    setSelected(value);
    sessionStorage.setItem(SESSION_KEY, value.toString());
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
