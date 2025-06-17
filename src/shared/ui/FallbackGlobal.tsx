'use client';

import { FallbackProps } from 'react-error-boundary';
import { getErrorDataByCode } from '@/shared/lib';
import { useRouter } from 'next/navigation';
import Button from './Button';
import styled from 'styled-components';
import Link from 'next/link';

export const FallbackGlobal = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const router = useRouter();

  const navigatePage = (to: string) => {
    // resetErrorBoundary를 호출하여 에러를 초기화
    resetErrorBoundary();
    router.push(to);
  };

  const errorData = getErrorDataByCode(error);
  return (
    <Container>
      <Wrapper>
        <CodeText>{errorData.code}!</CodeText>
        <MessageText>{errorData.message}</MessageText>
        <StyledLink href={errorData.requireLogin ? '/login' : '/'}>
          {errorData.requireLogin ? '로그인' : '메인 화면으로'}
        </StyledLink>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  gap: 10px;
`;

const CodeText = styled.span`
  font-weight: 600;
  font-size: 32px;
`;

const MessageText = styled.span`
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: inherit;
`;
