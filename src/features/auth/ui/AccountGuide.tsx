'use client';

import { useTheme } from 'styled-components';
import Link from 'next/link';
import styled from 'styled-components';

const AccountGuide = () => {
  const theme = useTheme();
  return (
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
  );
};

export default AccountGuide;

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
