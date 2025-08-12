'use client';

import styled, { useTheme } from 'styled-components';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

const LocalErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <Container>
              <p>데이터를 불러오는 중 문제가 발생했습니다.</p>
              <div
                onClick={() => resetErrorBoundary()}
                style={{
                  color: theme.colors.GRAY_500,
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}>
                다시 시도
              </div>
            </Container>
          )}>
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default LocalErrorBoundary;

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
