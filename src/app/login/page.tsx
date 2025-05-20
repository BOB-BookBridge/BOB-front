'use client';

import LoginLayout from '@/features/auth/LoginLayout';
import styled from 'styled-components';

const LoginPage = () => {
  return (
    <Container>
      <LoginLayout />
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
