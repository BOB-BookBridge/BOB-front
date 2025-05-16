'use client';
import styled from 'styled-components';

const FilterSideBar = () => {
  return <Container>사이드바</Container>;
};

export default FilterSideBar;

export const Container = styled.aside`
  width: 200px;
  @media (max-width: 744px) {
    display: none;
  }
`;
