'use client';

import styled from 'styled-components';
import { FallbackProps } from 'react-error-boundary';
import { usePathname } from 'next/navigation';
import { getErrorDataByCode } from '@/shared/lib';

export const FallbackGlobal = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const pathname = usePathname();

  const navigatePage = (to: string) => {
    if (pathname === to) {
      window.location.reload();
    } else {
      window.location.href = to;
    }
    resetErrorBoundary();
  };

  const errorData = getErrorDataByCode(error);
  const isLoginRequired =
    'requireLogin' in errorData && errorData.requireLogin === true;
  return (
    <Container>
      <Wrapper>
        <CodeText>{errorData.title}!</CodeText>
        <MessageText>{errorData.detail}</MessageText>
        <StyledLink
          onClick={() => navigatePage(isLoginRequired ? '/login' : '/')}>
          {isLoginRequired ? '로그인' : '메인 화면으로'}
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
  white-space: pre-line;
`;

const StyledLink = styled.div`
  text-decoration: underline;
  color: inherit;
  cursor: pointer;
`;
