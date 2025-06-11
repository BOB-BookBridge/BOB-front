'use client';

import { My } from '@/features/user/ui';
import styled from 'styled-components';

const MyPage = () => {
  return (
    <Container>
      <My />
    </Container>
  );
};
export default MyPage;

const Container = styled.div`
  margin-right: 100px;
  @media (max-width: 744px) {
    margin-right: 0;
  }
`;
