'use client';

import Image from 'next/image';
import styled, { useTheme } from 'styled-components';
import ErrorLogo from '@/shared/assets/error-logo.png';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
const ErrorPage = () => {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const cause = searchParams?.get('cause');

  return (
    <Container>
      <Image src={ErrorLogo.src} width={150} height={150} alt={'logo'} />
      <TextContainer>
        <div style={{ marginBottom: 10 }}>
          <div>로그인 과정에서 문제가 발생했습니다</div>
          <div>다시 진행해 주세요</div>
          {cause && <CauseText>{cause}</CauseText>}
        </div>
        <Link
          href='/login'
          style={{
            color: theme.colors.GRAY_500,
          }}>
          로그인 페이지로
        </Link>
      </TextContainer>
    </Container>
  );
};

export default ErrorPage;

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

const CauseText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_700};
  margin-top: 10px;
`;
