'use client';

import styled from 'styled-components';
import { colors } from '@/shared/constants';
import Image from 'next/image';
import SignUpForm from './SignUpForm';

const SignUpLayout = () => {
  return (
    <Container>
      <Image src='/logo-dark.svg' width={100} height={100} alt='Logo' />
      <SignUpForm />
    </Container>
  );
};
export default SignUpLayout;

const Container = styled.div`
  max-width: 370px;
  width: 100%;
  border: 1px solid ${colors.dark.GRAY_500};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;
