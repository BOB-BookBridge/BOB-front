'use client';

import styled, { useTheme } from 'styled-components';
import Link from 'next/link';
import { colors } from '@/shared/constants';
import LoginForm from './LoginForm';
import AccountGuide from './AccountGuide';
import Logo from '@/shared/assets/logo-text.svg';

const LoginLayout = () => {
  const theme = useTheme();
  return (
    <Container>
      <Link href='/'>
        <Logo width={150} />
      </Link>
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
