import styled from 'styled-components';
import NaverLogin from '@/shared/assets/naver.png';
import GoogleLogin from '@/shared/assets/google.png';
import Link from 'next/link';

const SocialLoginSection = () => {
  return (
    <Wrapper>
      <DividerWithText>
        <Line />
        <Text>또는</Text>
        <Line />
      </DividerWithText>
      <SocialLoginContainer>
        <Link href={'https://api.bookbridge.kr/oauth2/authorization/naver'}>
          <Icon src={NaverLogin.src} alt='네이버 로그인' />
        </Link>
        <Link href={'https://api.bookbridge.kr/oauth2/authorization/google'}>
          <Icon src={GoogleLogin.src} alt='구글 로그인' />
        </Link>
      </SocialLoginContainer>
    </Wrapper>
  );
};

export default SocialLoginSection;

const Wrapper = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const DividerWithText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.GRAY_500};
`;

const Text = styled.div`
  font-size: 14px;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;

const SocialLoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
