'use client';

import styled from 'styled-components';
import { colors } from '@/shared/constants';
import LoginForm from './LoginForm';
import AccountGuide from './AccountGuide';
import Image from 'next/image';

const LoginLayout = () => {
  return (
    <Container>
      <Image src='/logo-dark.svg' width={150} height={150} alt='Logo' />
      <LoginForm />
      <AccountGuide />
    </Container>
  );
};
export default LoginLayout;

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
