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

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  {
    label: '대시보드',
    href: '/admin/dashboard',
    icon: <DashboardIcon />,
  },
  {
    label: '회원 관리',
    href: '/admin/users',
    icon: <UsersIcon />,
  },
  {
    label: '게시글/키워드 관리',
    href: '/admin/posts',
    icon: <PostsIcon />,
    children: [
      {
        label: '게시글 관리',
        href: '/admin/posts',
        icon: null,
      },
      {
        label: '필터링 키워드 관리',
        href: '/admin/posts/keywords',
        icon: null,
      },
    ],
  },
  {
    label: '문의/신고',
    href: '/admin/supports',
    icon: <ReportsIcon />,
    children: [
      {
        label: '문의',
        href: '/admin/supports/inquiries',
        icon: null,
      },
      {
        label: '신고',
        href: '/admin/supports/reports',
        icon: null,
      },
    ],
  },
  {
    label: '공지',
    href: '/admin/announcements',
    icon: <AnnouncementsIcon />,
  },
];
const AdminSidebar = () => {
  const pathname = usePathname();
  const isParentActive = (href: string) => pathname.startsWith(href);

  return (
    <Container>
      {navItems.map((item) => (
        <div key={item.href}>
          <NavLink href={item.href} $active={isParentActive(item.href)}>
            {item.icon} {item.label}
          </NavLink>
          {item.children && isParentActive(item.href) && (
            <SubNavWrapper>
              {item.children.map((children) => (
                <SubNavLink
                  key={'children' + children.href}
                  href={children.href}
                  $active={pathname === children.href}>
                  {children.label}
                </SubNavLink>
              ))}
            </SubNavWrapper>
          )}
        </div>
      ))}
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

const SubNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 36px;
  gap: 4px;
`;

const SubNavLink = styled(Link)<{ $active: boolean }>`
  padding: 4px 8px;
  border-radius: 8px;
  text-decoration: none;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.SECONDARY : theme.colors.GRAY_600};
  font-weight: ${({ $active }) => ($active ? '500' : '300')};
  font-size: 14px;

  &:hover {
    background: ${({ theme }) => theme.colors.GRAY_300};
  }
`;
