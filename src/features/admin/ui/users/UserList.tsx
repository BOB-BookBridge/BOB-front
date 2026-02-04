'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { LoadingIndicator, LoadingContainer, ModalLayout } from '@/shared/ui';
import { formatDate, LocalErrorBoundary, memberStatusMap } from '@/shared/lib';
import AdminTable, { ColumnConfig } from '../AdminTable';
import UserDetail from './UserDetail';
import { Pagination } from '..';
import {
  MemberStatus,
  useMemberListQuery,
  UserSearchKey,
} from '@/entities/admin';

export const PAGE_SIZE = 20;

interface UserListProps {
  searchKey: UserSearchKey;
  keyword: string;
}

const UserList = ({ searchKey, keyword }: UserListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDetail, setOpenDetail] = useState<string>('');
  const { data, isPending } = useMemberListQuery({
    key: searchKey,
    keyword,
    page: currentPage - 1,
    size: PAGE_SIZE,
  });

  const columns: ColumnConfig[] = [
    { key: 'number', label: '번호', width: 8 },
    {
      key: 'role',
      label: '권한',
      width: 12,
      render: (role) => (role === 'ADMIN' ? '관리자' : '사용자'),
    },
    { key: 'nickname', label: '닉네임', width: 18 },
    { key: 'email', label: '이메일', width: 30 },
    {
      key: 'status',
      label: '활성 상태',
      width: 14,
      render: (status) => (
        <StatusBadge $status={status as MemberStatus}>
          {memberStatusMap[status as MemberStatus]}
        </StatusBadge>
      ),
    },
    {
      key: 'createdAt',
      label: '가입일',
      width: 18,
      render: (date) => formatDate(date as string),
    },
  ];
  return (
    <Container>
      {isPending ? (
        <LoadingContainer>
          <LoadingIndicator />
        </LoadingContainer>
      ) : (
        data && (
          <>
            <AdminTable
              columns={columns}
              data={data.members.map((member, index) => ({
                ...member,
                number: (currentPage - 1) * PAGE_SIZE + index + 1,
              }))}
              onRowClick={(member) => setOpenDetail(member.id)}
              keyExtractor={(member) => member.id}
            />
            <Pagination
              totalCount={data.totalCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )
      )}
      {openDetail && (
        <ModalLayout
          isOpen={!!openDetail}
          title='회원 정보'
          onClose={() => setOpenDetail('')}>
          <LocalErrorBoundary>
            <UserDetail id={openDetail} />
          </LocalErrorBoundary>
        </ModalLayout>
      )}
    </Container>
  );
};

export default UserList;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const STATUS_STYLE_MAP = {
  ACTIVE: { color: 'SECONDARY', backgroundColor: 'SECONDARY_100' },
  BANNED: { color: 'DANGER', backgroundColor: 'DANGER_100' },
  DEACTIVATED: { color: 'GRAY_500', backgroundColor: 'GRAY_200' },
} as const;

const StatusBadge = styled.span<{ $status: MemberStatus }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ $status, theme }) =>
    theme.colors[STATUS_STYLE_MAP[$status].color]};
  background-color: ${({ $status, theme }) =>
    theme.colors[STATUS_STYLE_MAP[$status].backgroundColor]};
`;
