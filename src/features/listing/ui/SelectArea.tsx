'use client';
import styled from 'styled-components';

const SelectArea = () => {
  return <Container>지역 선택</Container>;
};
export default SelectArea;

const Container = styled.div`
  width: 120px;
  height: 40px;
  background-color: brown;

  @media (min-width: 744px) {
    display: none;
  }
`;
