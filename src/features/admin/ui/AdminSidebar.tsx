import Link from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import {
  AnnouncementsIcon,
  DashboardIcon,
  PostsIcon,
  ReportsIcon,
  UsersIcon,
} from '@/shared/assets/icons';

const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <Container>
      <NavLink
        href='/admin/dashboard'
        $active={pathname === '/admin/dashboard'}>
        <DashboardIcon />
        대시보드
      </NavLink>

      <NavLink href='/admin/users' $active={pathname === '/admin/users'}>
        <UsersIcon />
        회원 관리
      </NavLink>

      <NavLink href='/admin/posts' $active={pathname === '/admin/posts'}>
        <PostsIcon />
        게시글 관리
      </NavLink>

      <NavLink href='/admin/reports' $active={pathname === '/admin/reports'}>
        <ReportsIcon />
        문의/신고
      </NavLink>

      <NavLink
        href='/admin/announcements'
        $active={pathname === '/admin/announcements'}>
        <AnnouncementsIcon />
        공지
      </NavLink>
    </Container>
  );
};

export default AdminSidebar;

const Container = styled.aside`
  width: 250px;
  padding: 20px;
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  text-decoration: none;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.SECONDARY : theme.colors.BLACK};
  font-weight: ${({ $active }) => ($active ? '600' : '400')};

  &:hover {
    background: ${({ theme }) => theme.colors.GRAY_300};
  }

  svg {
    stroke: currentColor;
    stroke-width: ${({ $active }) => ($active ? 2.5 : 2)};
  }
`;
