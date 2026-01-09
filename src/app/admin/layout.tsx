'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminSidebar } from '@/features/admin/ui';
import { getMyProfile } from '@/entities/user';
import { LoadingIndicator } from '@/shared/ui';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getMyProfile();
        if (data.role !== 'ADMIN') {
          router.push('/403');
        }
        setIsAuthorized(true);
      } catch (error) {
        router.push('/login');
      }
    };

    checkAuth();
  }, []);

  if (!isAuthorized) return <LoadingIndicator text='처리중...' />;

  return (
    <Container>
      <AdminSidebar />
      <Content>{children}</Content>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  padding: 30px 30px 30px 0;
`;
