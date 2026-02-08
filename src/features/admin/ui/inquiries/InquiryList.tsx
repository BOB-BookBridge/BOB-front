'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useInquiriesQuery } from '@/entities/admin/inquirues/queries';
import { simpleFormatDate, inquiryStatusMap } from '@/shared/lib';
import { LoadingIndicator, LoadingContainer } from '@/shared/ui';
import { STATUS_STYLE_MAP } from '../../constants/status_style';
import AdminTable, { ColumnConfig } from '../AdminTable';
import { Pagination } from '..';
import {
  InquirySearchKey,
  InquiryStatus,
  InquiryStatusWithAll,
} from '@/entities/admin/inquirues';

export const PAGE_SIZE = 20;

interface InquiryListProps {
  searchKey: InquirySearchKey;
  keyword: string;
  status: InquiryStatusWithAll;
}

// 현재는 email이 유일한 searchKey이지만 추후 더 생길 수도 있어 포함해둠
const InquiryList = ({ searchKey, keyword, status }: InquiryListProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { isPending, data } = useInquiriesQuery({
    email: keyword,
    status: status === 'ALL' ? undefined : status,
    page: currentPage - 1,
    size: PAGE_SIZE,
  });

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
      render: (date) => (date ? simpleFormatDate(date as string) : '-'),
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
