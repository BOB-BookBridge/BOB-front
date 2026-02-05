import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { reportStatusMap, simpleFormatDate } from '@/shared/lib';
import AdminTable, { ColumnConfig } from '../AdminTable';
import { STATUS_STYLE_MAP } from '../../constants';
import Pagination from '../Pagination';
import {
  ReportSearchKey,
  ReportStatus,
  ReportStatusWithAll,
  ReportTypeWithAll,
  User,
} from '@/entities/admin/reports';

const PAGE_SIZE = 20;

const data = {
  totalCount: 2,
  reports: [
    {
      id: 2,
      status: 'PENDING',
      type: 'CHAT',
      reason: '욕설/비방',
      reporter: {
        id: '019b0689-4ddd-7d0e-807a-cff21461a374',
        email: 'manager@bob.com',
        nickname: 'manager001',
      },
      reported: {
        id: '019b0689-4ddd-7d0e-807a-bfcbcc682200',
        email: 'znight1020@naver.com',
        nickname: 'leehs',
      },
      managerNickname: null,
      processedAt: null,
      createdAt: '2026-01-14T14:00:57',
    },
    {
      id: 1,
      status: 'PENDING',
      type: 'POST',
      reason: '부적절한 콘텐츠',
      reporter: {
        id: '019b0689-4ddd-7d0e-807a-cff21461a374',
        email: 'manager@bob.com',
        nickname: 'manager001',
      },
      reported: {
        id: '019b0689-4ddd-7d0e-807a-bfcbcc682200',
        email: 'znight1020@naver.com',
        nickname: 'leehs',
      },
      managerNickname: null,
      processedAt: null,
      createdAt: '2025-12-20T20:08:14',
    },
  ],
};
interface ReportListProps {
  searchKey: ReportSearchKey;
  keyword: string;
  status: ReportStatusWithAll;
  type: ReportTypeWithAll;
}

const ReportList = ({ searchKey, keyword, status, type }: ReportListProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const columns: ColumnConfig[] = [
    { key: 'number', label: '번호', width: 6 },
    {
      key: 'status',
      label: '상태',
      width: 12,
      render: (status) => (
        <StatusBadge $status={status as ReportStatus}>
          {reportStatusMap[status as ReportStatus]}
        </StatusBadge>
      ),
    },
    { key: 'type', label: '신고 대상', width: 10 },
    { key: 'reason', label: '신고 사유', width: 20 },
    {
      key: 'reporter',
      label: '신고자',
      width: 20,
      render: (reporter) => (reporter as User).nickname as string,
    },
    {
      key: 'createdAt',
      label: '신고일',
      width: 10,
      render: (date) => simpleFormatDate(date as string),
    },
    {
      key: 'processedAt',
      label: '처리일',
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
    <>
      <AdminTable
        columns={columns}
        data={data.reports.map((rep, index) => ({
          ...rep,
          number: (currentPage - 1) * PAGE_SIZE + index + 1,
        }))}
        onRowClick={(rep) => router.push(`/admin/supports/reports/${rep.id}`)}
        keyExtractor={(rep) => rep.id}
      />
      <Pagination
        totalCount={data.totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default ReportList;

const StatusBadge = styled.span<{ $status: ReportStatus }>`
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
