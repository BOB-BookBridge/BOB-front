'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { LocalErrorBoundary } from '@/shared/lib';
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
      <LocalErrorBoundary>
        <ChatList />
      </LocalErrorBoundary>
    </Container>
  );
};

export default ChatPage;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: auto;
`;
