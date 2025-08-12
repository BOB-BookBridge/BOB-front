'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/shared/model';
import ChatRoom from '@/features/chat/ui/ChatRoom';
import { LocalErrorBoundary } from '@/shared/lib';

const ChatRoomPage = () => {
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
        <ChatRoom />
      </LocalErrorBoundary>
    </Container>
  );
};

export default ChatRoomPage;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
