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
  AdminPostStatus,
  AdminPostStatusWithAll,
  PostSearchKey,
} from '@/entities/admin/posts';

export const PAGE_SIZE = 20;

interface PostListProps {
  searchKey: PostSearchKey;
  keyword: string;
  status: AdminPostStatusWithAll;
}
const data = {
  totalCount: 3,
  posts: [
    {
      id: 3020,
      title: '빠르게 실패하기',
      thumbnailUrl:
        'https://image.aladin.co.kr/product/30070/40/cover500/k892839663_2.jpg',
      description: '나쁜말',
      status: 'PENDING',
      createdAt: '2026-02-08T13:30:49',
      writer: {
        id: 'cb09d2d9-fa06-11f0-b313-961215ac38c3',
        email: 'tester001@bob.com',
        nickname: 'tester001',
      },
    },
    {
      id: 3017,
      title: '밥 챙겨 먹어요, 행복하세요',
      thumbnailUrl:
        'https://image.aladin.co.kr/product/30585/22/cover500/k842830716_1.jpg',
      description: '심한욕',
      status: 'PENDING',
      createdAt: '2026-02-08T13:30:40',
      writer: {
        id: 'cb09d2d9-fa06-11f0-b313-961215ac38c3',
        email: 'tester001@bob.com',
        nickname: 'tester001',
      },
    },
    {
      id: 3028,
      title: '넌 대체 몇 년째 영어 공부를 하고 있는 거니?',
      thumbnailUrl:
        'https://image.aladin.co.kr/product/30665/63/cover500/k562830031_1.jpg',
      description: '신고 제재용 게시글',
      status: 'BANNED',
      createdAt: '2026-02-08T13:30:45',
      writer: {
        id: 'cb09d2d9-fa06-11f0-b313-961215ac38c3',
        email: 'tester001@bob.com',
        nickname: 'tester001',
      },
    },
  ],
} as const;
// 현재는 email이 유일한 searchKey이지만 추후 더 생길 수도 있어 포함해둠
const PostList = ({ searchKey, keyword, status }: PostListProps) => {
  const router = useRouter();
  const isPending = false;
  const [currentPage, setCurrentPage] = useState(1);

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
        <StatusBadge $status={status as AdminPostStatus}>
          {adminPostStatusMap[status as AdminPostStatus]}
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
        data && (
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
        )
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

const StatusBadge = styled.span<{ $status: AdminPostStatus }>`
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
