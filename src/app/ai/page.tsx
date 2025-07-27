'use client';
import { AI } from '@/features/ai/ui';
import styled from 'styled-components';

const AIPage = () => {
  return (
    <Container>
      <AI />
    </Container>
  );
};
export default AIPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: hidden;
`;
