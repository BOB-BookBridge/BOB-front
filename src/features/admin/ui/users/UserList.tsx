import { useState } from 'react';
import styled from 'styled-components';
import { formatDate } from '@/shared/lib';
import { ModalLayout } from '@/shared/ui';
import Pagination from './Pagination';
import UserDetail from './UserDetail';

const mockData = {
  totalCount: 20,
  members: [
    {
      id: '019b0689-4ddd-7d0e-807a-cff21461a374',
      status: 'ACTIVE',
      role: 'ADMIN',
      email: 'manager@bob.com',
      nickname: 'manager001',
      reportCount: 0,
      area: null,
      memo: null,
      lastActiveAt: null,
      createdAt: '2025-09-28T13:33:40.302',
    },
    {
      id: '019b0689-4ddd-7d0e-807a-bfcbcc682200',
      status: 'BANNED',
      role: 'USER',
      email: 'kmdy125@gmail.com',
      nickname: '김도예',
      reportCount: 1,
      area: null,
      memo: null,
      lastActiveAt: '2025-05-27T17:05:00.287672',
      createdAt: '2025-05-27T13:33:40.302565',
    },
  ],
};
const PAGE_SIZE = 20;
const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [openDetail, setOpenDetail] = useState<string>('');
  return (
    <Container>
      <Table>
        <thead>
          <TableHeader>
            <th>번호</th>
            <th>권한</th>
            <th>닉네임</th>
            <th>이메일</th>
            <th>활성 상태</th>
            <th>가입일</th>
          </TableHeader>
        </thead>
        <tbody>
          {mockData.members.map((member, index) => {
            const absoluteNumber = (currentPage - 1) * PAGE_SIZE + index + 1;
            return (
              <TableRow
                key={member.id}
                onClick={() => setOpenDetail(member.id)}>
                <td>{absoluteNumber}</td>
                <td>{member.role === 'ADMIN' ? '관리자' : '사용자'}</td>
                <td>{member.nickname}</td>
                <td>{member.email}</td>
                <td>
                  <StatusBadge $status={member.status}>
                    {member.status === 'ACTIVE'
                      ? '활성'
                      : member.status === 'BANNED'
                        ? '정지'
                        : '비활성'}
                  </StatusBadge>
                </td>
                <td>{formatDate(member.createdAt)}</td>
              </TableRow>
            );
          })}
        </tbody>
      </Table>
      <Pagination
        totalCount={mockData.totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {openDetail && (
        <ModalLayout
          isOpen={!!openDetail}
          title='회원 정보'
          onClose={() => setOpenDetail('')}>
          <UserDetail id={openDetail} />
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

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 2px 2px ${({ theme }) => theme.colors.GRAY_300};
  table-layout: fixed;

  th:nth-child(1) {
    width: 8%;
  }
  th:nth-child(2) {
    width: 12%;
  }
  th:nth-child(3) {
    width: 18%;
  }
  th:nth-child(4) {
    width: 30%;
  }
  th:nth-child(5) {
    width: 14%;
  }
  th:nth-child(6) {
    width: 18%;
  }
`;

const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_200};
  }

  td {
    padding: 12px 0;
    text-align: center;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.BLACK};
  }
`;

const TableHeader = styled.tr`
  th {
    padding: 12px 0;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.BLACK};
    border-bottom: 2px solid ${({ theme }) => theme.colors.GRAY_300};
  }
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ $status, theme }) =>
    $status === 'ACTIVE' ? theme.colors.SECONDARY : theme.colors.GRAY_500};
  background-color: ${({ $status, theme }) =>
    $status === 'ACTIVE' ? theme.colors.SECONDARY_100 : theme.colors.GRAY_200};
`;
