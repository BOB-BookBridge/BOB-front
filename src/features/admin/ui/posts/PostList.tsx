'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { simpleFormatDate, adminPostStatusMap } from '@/shared/lib';
import { LoadingIndicator, LoadingContainer } from '@/shared/ui';
import { STATUS_STYLE_MAP } from '../../constants/status_style';
import AdminTable, { ColumnConfig } from '../AdminTable';
import { User } from '@/entities/admin/reports';
import { Pagination } from '..';
import {
  AdminFilterPostStatus,
  AdminFilterPostStatusWithAll,
  PostSearchKey,
  useAdminPostsQuery,
} from '@/entities/admin/posts';

export const PAGE_SIZE = 20;

interface PostListProps {
  searchKey: PostSearchKey;
  keyword: string;
  status: AdminFilterPostStatusWithAll;
}

// 현재는 email이 유일한 searchKey이지만 추후 더 생길 수도 있어 포함해둠
const PostList = ({ searchKey, keyword, status }: PostListProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { isPending, data } = useAdminPostsQuery({
    email: searchKey === 'email' && keyword ? keyword : undefined,
    status: status === 'ALL' ? undefined : status,
    page: currentPage - 1,
    size: PAGE_SIZE,
  });

  const columns: ColumnConfig[] = [
    { key: 'number', label: '번호', width: 6 },
    { key: 'title', label: '제목', width: 40 },
    {
      key: 'writer',
      label: '작성자',
      width: 30,
      render: (writer) => (writer as User).email as string,
    },
    {
      key: 'status',
      label: '상태',
      width: 10,
      render: (status) => (
        <StatusBadge $status={status as AdminFilterPostStatus}>
          {adminPostStatusMap[status as AdminFilterPostStatus]}
        </StatusBadge>
      ),
    },
    {
      key: 'createdAt',
      label: '등록일',
      width: 14,
      render: (date) => simpleFormatDate(date as string),
    },
  ];
  return (
    <Container>
      {isPending ? (
        <LoadingContainer>
          <LoadingIndicator />
        </LoadingContainer>
      ) : (
        data &&
        (data.totalCount === 0 ? (
          <LoadingContainer>
            <div>게시글이 없습니다</div>
          </LoadingContainer>
        ) : (
          <>
            <AdminTable
              columns={columns}
              data={data.posts.map((post, index) => ({
                ...post,
                number: (currentPage - 1) * PAGE_SIZE + index + 1,
              }))}
              onRowClick={(post) =>
                router.push(`/admin/posts/manage/${post.id}`)
              }
              keyExtractor={(post) => post.id}
            />
            <Pagination
              totalCount={data.totalCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        ))
      )}
    </Container>
  );
};

export default PostList;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatusBadge = styled.span<{ $status: AdminFilterPostStatus }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${({ $status, theme }) =>
    theme.colors[STATUS_STYLE_MAP[$status].color]};
  background-color: ${({ $status, theme }) =>
    theme.colors[STATUS_STYLE_MAP[$status].backgroundColor]};
`;
