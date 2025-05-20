'use client';
import styled from 'styled-components';
import { colors } from '@/shared/constants';
import { InputGroup } from '@/shared/ui';
import { useTheme } from 'styled-components';
import Button from '@/shared/ui/Button';
import Link from 'next/link';

const LoginForm = () => {
  const theme = useTheme();
  let email = '';
  let password = '';
  let disabled = false;
  return (
    <Container>
      <img src='/logo-dark.svg' width='150px' alt='Logo'></img>
      <InputGroup
        inputs={[
          {
            name: 'email',
            placeholder: '이메일',
            value: email,
            onChange: () => {
              console.log('email');
            },
          },
          {
            name: 'password',
            placeholder: '비밀번호',
            value: password,
            onChange: () => {
              console.log('password');
            },
          },
        ]}
      />
      <Button text='로그인' disabled={disabled} />
      <div style={{ width: '100%', maxWidth: 300 }}>
        <AccountGuideRow>
          <AccountGuideText>계정이 없으신가요?</AccountGuideText>
          <Link
            href='/signup'
            style={{
              fontSize: '12px',
              color: theme.colors.GRAY_500,
            }}>
            회원가입
          </Link>
        </AccountGuideRow>
        <AccountGuideRow>
          <AccountGuideText>비밀번호를 분실하셨나요?</AccountGuideText>
          <Link
            href='/password/request'
            style={{
              fontSize: '12px',
              color: theme.colors.GRAY_500,
            }}>
            임시 비밀번호 발급
          </Link>
        </AccountGuideRow>
      </div>
    </Container>
  );
};
export default LoginForm;

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

const AccountGuideRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  margin-top: 5px;
`;

const AccountGuideText = styled.p`
  font-size: 12px;
`;
