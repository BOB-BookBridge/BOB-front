'use client';
import styled from 'styled-components';

const FilterMenu = () => {
  return <Container>필터메뉴자리</Container>;
};
export default FilterMenu;

const Container = styled.div`
  width: 90px;
  height: 40px;
  background-color: grey;

  @media (min-width: 744px) {
    display: none;
  }
`;
