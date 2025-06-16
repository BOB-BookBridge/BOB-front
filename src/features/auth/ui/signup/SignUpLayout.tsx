'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { colors } from '@/shared/constants';
import Logo from '@/shared/assets/logo-text.svg';
import SignUpForm from './SignUpForm';

const SignUpLayout = () => {
  return (
    <Container>
      <Link href='/'>
        <Logo width={150} />
      </Link>
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
