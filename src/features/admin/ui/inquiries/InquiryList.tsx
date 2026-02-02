'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { LoadingIndicator, LoadingContainer } from '@/shared/ui';
import { simpleFormatDate, inquiryStatusMap } from '@/shared/lib';
import AdminTable, { ColumnConfig } from '../AdminTable';
import { STATUS_STYLE_MAP } from './constants';
import { Pagination } from '..';
import {
  InquirySearchKey,
  InquiryStatus,
  InquiryStatusWithAll,
} from '@/entities/admin/inquirues';

export const PAGE_SIZE = 20;

const data = {
  totalCount: 20,
  inquiries: [
    {
      id: 20,
      status: 'PENDING',
      title: '로그인이 안 돼요',
      email: 'user1@gmail.com',
      managerNickname: null,
      createdAt: '2026-01-22T14:30:00',
      processedAt: null,
    },
    {
      id: 19,
      status: 'PENDING',
      title: '결제 오류 문의',
      email: 'user2@naver.com',
      managerNickname: null,
      createdAt: '2026-01-22T13:15:00',
      processedAt: null,
    },
    {
      id: 18,
      status: 'PENDING',
      title: '회원 탈퇴 방법',
      email: 'user3@gmail.com',
      managerNickname: null,
      createdAt: '2026-01-22T11:45:00',
      processedAt: null,
    },
    {
      id: 17,
      status: 'PENDING',
      title: '비밀번호 초기화',
      email: 'user4@outlook.com',
      managerNickname: null,
      createdAt: '2026-01-22T10:20:00',
      processedAt: null,
    },
    {
      id: 16,
      status: 'IN_REVIEW',
      title: '계정 보안 문제',
      email: 'user5@gmail.com',
      managerNickname: 'manager001',
      createdAt: '2026-01-21T16:50:00',
      processedAt: null,
    },
    {
      id: 15,
      status: 'PROCESSED',
      title: '배송 관련 문의',
      email: 'user6@naver.com',
      managerNickname: 'manager002',
      createdAt: '2026-01-21T15:30:00',
      processedAt: '2026-01-22T09:15:30',
    },
    {
      id: 14,
      status: 'PROCESSED',
      title: '상품 교환 요청',
      email: 'user7@gmail.com',
      managerNickname: 'manager001',
      createdAt: '2026-01-21T14:20:00',
      processedAt: '2026-01-22T08:45:20',
    },
    {
      id: 13,
      status: 'PROCESSED',
      title: '환불 요청',
      email: 'user8@daum.net',
      managerNickname: 'manager003',
      createdAt: '2026-01-21T13:10:00',
      processedAt: '2026-01-21T17:30:45',
    },
    {
      id: 12,
      status: 'PROCESSED',
      title: '앱 오류 신고',
      email: 'user9@gmail.com',
      managerNickname: 'manager001',
      createdAt: '2026-01-21T12:00:00',
      processedAt: '2026-01-21T16:25:10',
    },
    {
      id: 11,
      status: 'PROCESSED',
      title: '이메일 변경 방법',
      email: 'user10@naver.com',
      managerNickname: 'manager002',
      createdAt: '2026-01-21T11:30:00',
      processedAt: '2026-01-21T15:45:50',
    },
    {
      id: 10,
      status: 'PROCESSED',
      title: '프로모션 코드 문제',
      email: 'user11@gmail.com',
      managerNickname: 'manager003',
      createdAt: '2026-01-21T10:45:00',
      processedAt: '2026-01-21T14:20:30',
    },
    {
      id: 9,
      status: 'PROCESSED',
      title: '구독 취소 관련',
      email: 'user12@outlook.com',
      managerNickname: 'manager001',
      createdAt: '2026-01-21T09:15:00',
      processedAt: '2026-01-21T13:50:15',
    },
    {
      id: 8,
      status: 'PROCESSED',
      title: '포인트 적립 오류',
      email: 'user13@gmail.com',
      managerNickname: 'manager002',
      createdAt: '2026-01-21T08:30:00',
      processedAt: '2026-01-21T12:15:40',
    },
    {
      id: 7,
      status: 'PROCESSED',
      title: '배송 추적 불가',
      email: 'user14@naver.com',
      managerNickname: 'manager003',
      createdAt: '2026-01-20T16:45:00',
      processedAt: '2026-01-21T11:30:25',
    },
    {
      id: 6,
      status: 'CLOSED',
      title: '중복 주문 취소',
      email: 'user15@gmail.com',
      managerNickname: 'manager001',
      createdAt: '2026-01-20T15:20:00',
      processedAt: null,
    },
    {
      id: 5,
      status: 'PROCESSED',
      title: '회원 정보 수정',
      email: 'user16@daum.net',
      managerNickname: 'manager002',
      createdAt: '2026-01-20T14:10:00',
      processedAt: '2026-01-21T10:45:35',
    },
    {
      id: 4,
      status: 'CLOSED',
      title: '비회원 문의',
      email: 'znight3040@gmail.com',
      managerNickname: null,
      createdAt: '2026-01-20T13:00:00',
      processedAt: null,
    },
    {
      id: 3,
      status: 'IN_REVIEW',
      title: '스팸 신고',
      email: 'user17@gmail.com',
      managerNickname: 'manager003',
      createdAt: '2026-01-20T12:30:00',
      processedAt: null,
    },
    {
      id: 2,
      status: 'PROCESSED',
      title: '회원 문의',
      email: 'znight1020@naver.com',
      managerNickname: 'manager001',
      createdAt: '2026-01-20T07:34:41',
      processedAt: '2026-01-21T10:42:09',
    },
    {
      id: 1,
      status: 'PENDING',
      title: '테스트 문의',
      email: 'manager@bob.com',
      managerNickname: null,
      createdAt: '2026-01-20T07:34:15',
      processedAt: null,
    },
  ],
};
interface InquiryListProps {
  searchKey: InquirySearchKey;
  keyword: string;
  status: InquiryStatusWithAll;
}

const InquiryList = ({ searchKey, keyword, status }: InquiryListProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const isPending = false;
  const columns: ColumnConfig[] = [
    { key: 'number', label: '번호', width: 6 },
    {
      key: 'status',
      label: '상태',
      width: 10,
      render: (status) => (
        <StatusBadge $status={status as InquiryStatus}>
          {inquiryStatusMap[status as InquiryStatus]}
        </StatusBadge>
      ),
    },
    { key: 'title', label: '문의 제목', width: 26 },
    { key: 'email', label: '문의자', width: 26 },
    {
      key: 'createdAt',
      label: '작성일',
      width: 10,
      render: (date) => simpleFormatDate(date as string),
    },
    {
      key: 'processedAt',
      label: '답변일',
      width: 10,
      render: (date) => simpleFormatDate(date as string),
    },
    {
      key: 'managerNickname',
      label: '담당자',
      width: 12,
      render: (nickname) => (nickname ? (nickname as string) : '-'),
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
              data={data.inquiries.map((inq, index) => ({
                ...inq,
                number: (currentPage - 1) * PAGE_SIZE + index + 1,
              }))}
              onRowClick={(inq) =>
                router.push(`/admin/supports/inquiries/${inq.id}`)
              }
              keyExtractor={(inq) => inq.id}
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

export default InquiryList;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StatusBadge = styled.span<{ $status: InquiryStatus }>`
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
