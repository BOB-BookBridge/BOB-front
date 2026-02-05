'use client';
import { useState } from 'react';
import { ReportList, SearchBar, StatusBar } from '@/features/admin/ui';
import { Option } from '@/entities/admin';
import {
  ReportSearchKey,
  ReportStatus,
  ReportStatusWithAll,
  ReportType,
  ReportTypeWithAll,
} from '@/entities/admin/reports';
import {
  LocalErrorBoundary,
  reportStatusMap,
  reportTypeMap,
} from '@/shared/lib';

const AdminReportsPage = () => {
  const [searchKey, setSearchKey] = useState<ReportSearchKey>('reporterEmail');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedStatus, setSelectedStatus] =
    useState<ReportStatusWithAll>('ALL');
  const [selectedType, setSelectedType] = useState<ReportTypeWithAll>('ALL');

  const reportSearchOptions: Option[] = [
    { value: 'reporterEmail', label: '신고자 이메일' },
    { value: 'reportedEmail', label: '피신고자 이메일' },
  ];

  const allReportStatuses: ReportStatus[] = Object.keys(
    reportStatusMap,
  ) as ReportStatus[];

  const allReportTypes: ReportType[] = Object.keys(
    reportTypeMap,
  ) as ReportType[];

  const reportStatusOptions: Option<ReportStatusWithAll>[] = [
    { value: 'ALL', label: '전체' },
    ...allReportStatuses.map((status) => ({
      value: status,
      label: reportStatusMap[status],
    })),
  ];

  const reportTypeOptions: Option<ReportTypeWithAll>[] = [
    { value: 'ALL', label: '전체' },
    ...allReportTypes.map((type) => ({
      value: type,
      label: reportTypeMap[type],
    })),
  ];

  return (
    <>
      <SearchBar<ReportSearchKey>
        options={reportSearchOptions}
        searchKey={searchKey}
        keyword={keyword}
        onSearchKeyChange={setSearchKey}
        onKeywordChange={setKeyword}
      />
      <StatusBar<ReportType>
        options={reportTypeOptions}
        selectedValue={selectedType}
        onSelectedValueChange={setSelectedType}
      />
      <StatusBar<ReportStatus>
        options={reportStatusOptions}
        selectedValue={selectedStatus}
        onSelectedValueChange={setSelectedStatus}
      />
      <LocalErrorBoundary>
        <ReportList
          searchKey={searchKey}
          keyword={keyword}
          status={selectedStatus}
          type={selectedType}
        />
      </LocalErrorBoundary>
    </>
  );
};

export default AdminReportsPage;
