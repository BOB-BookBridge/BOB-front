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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
