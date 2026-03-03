'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useMyStore } from '@/shared/model';
import { useLogout } from '@/features/auth/model';
import { useMyQuery } from '@/entities/user';

import Logo from '@/shared/assets/logo.svg';
import * as S from './Header.styles';

const AdminHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useLogout();
  const { setIsLogin } = useMyStore();
  const isLogin = useMyStore((s) => s.isLogin);
  const { data, isPending, isError } = useMyQuery();

  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    const loginTmp = !isError && !!data?.id;
    setIsLogin(loginTmp);
  }, [data, isError, setIsLogin]);

  if (!isAdmin) return;
  return (
    <S.Container>
      <Link href='/admin' replace={true} onClick={() => sessionStorage.clear()}>
        <Logo width={60} />
      </Link>
      <S.RightSection>
        {!isPending && isLogin ? (
          <S.LoginButton onClick={logout}>로그아웃</S.LoginButton>
        ) : !isPending && !isLogin ? (
          <S.LoginButton onClick={() => router.push('/login')}>
            로그인
          </S.LoginButton>
        ) : null}
      </S.RightSection>
    </S.Container>
  );
};

export default AdminHeader;
