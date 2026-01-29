import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

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
          <IconWrapper>
            <Image src='/naver.png' alt='네이버 로그인' fill />
          </IconWrapper>
        </Link>
        <Link href={'https://api.bookbridge.kr/oauth2/authorization/google'}>
          <IconWrapper>
            <Image src='/google.png' alt='구글 로그인' fill />
          </IconWrapper>
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

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
