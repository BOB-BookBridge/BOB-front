'use client';
import styled from 'styled-components';

const ActiveFilterTag = () => {
  return <Container>필터태그자리</Container>;
};
export default ActiveFilterTag;

export const Container = styled.div`
  flex: 1;
  height: 40px;
  background-color: grey;

  @media (max-width: 744px) {
    display: none;
  }
`;
