'use client';
import styled from 'styled-components';

const FilterSideBar = () => {
  return <Container>사이드바</Container>;
};

export default FilterSideBar;

const Container = styled.aside`
  width: 250px;
  @media (max-width: 744px) {
    display: none;
  }
`;
