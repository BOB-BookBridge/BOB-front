'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMyProfile } from '@/entities/user';
import { LoadingIndicator } from '@/shared/ui';

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getMyProfile();
        if (data.role !== 'ADMIN') {
          router.push('/403');
        } else {
          router.push('/admin/dashboard');
        }
      } catch (error) {
        router.push('/login');
      }
    };

    checkAuth();
  }, []);

  return <LoadingIndicator text='처리중...' />;
};

export default AdminPage;
