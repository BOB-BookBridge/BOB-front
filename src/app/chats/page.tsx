'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ChatList } from '@/features/chat/ui';
import { useIsMobile } from '@/shared/model';

const ChatPage = () => {
  const isMobile = useIsMobile();
  const router = useRouter();

  useEffect(() => {
    if (isMobile === null) return;
    if (!isMobile) {
      router.replace('/');
    }
  }, [isMobile]);

  if (isMobile === null || !isMobile) return null;

  return (
    <Container>
      <ChatList />
    </Container>
  );
};

export default ChatPage;

const Container = styled.div`
  margin-right: 100px;
  @media (max-width: 744px) {
    margin-right: 0;
  }
`;
