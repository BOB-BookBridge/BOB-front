'use client';
import { PasswordRequestLayout } from '@/features/auth/ui';
import styled from 'styled-components';
const PasswordRequestPage = () => {
  return (
    <Container>
      <PasswordRequestLayout />
    </Container>
  );
};
export default PasswordRequestPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
