'use client';

import { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { Notifications } from '@/features/notification/ui';
import { LocalErrorBoundary } from '@/shared/lib';
import { useIsMobile } from '@/shared/model';

const NotiPage = () => {
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
        <Notifications />
      </LocalErrorBoundary>
    </Container>
  );
};

export default NotiPage;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  overflow-y: auto;
`;
