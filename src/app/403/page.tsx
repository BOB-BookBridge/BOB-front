'use client';

import Link from 'next/link';
import styled, { useTheme } from 'styled-components';

const ForbiddenPage = () => {
  const theme = useTheme();

  return (
    <Container>
      <img src='/error-logo.png' width={150} height={150} alt={'logo'} />
      <TextContainer>
        <div style={{ marginBottom: 10 }}>
          <div>접근 권한이 없습니다</div>
          <div>관리자만 접근할 수 있는 페이지입니다</div>
        </div>
        <Link
          href='/'
          style={{
            color: theme.colors.GRAY_500,
          }}>
          메인 페이지로
        </Link>
      </TextContainer>
    </Container>
  );
};
export default ForbiddenPage;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
