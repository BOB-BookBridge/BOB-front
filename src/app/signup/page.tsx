'use client';

import { SignUpLayout } from '@/features/auth/ui';
import styled from 'styled-components';

const SignUpPage = () => {
  return (
    <Container>
      <SignUpLayout />
    </Container>
  );
};

export default SignUpPage;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
`;
