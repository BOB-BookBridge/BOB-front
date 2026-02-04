'use client';

import { useState } from 'react';
import { InquiryList, StatusBar } from '@/features/admin/ui';
import { inquiryStatusMap } from '@/shared/lib/adminTextMap';
import SearchBar from '@/features/admin/ui/SearchBar';
import { LocalErrorBoundary } from '@/shared/lib';
import { Option } from '@/entities/admin';
import {
  InquirySearchKey,
  InquiryStatus,
  InquiryStatusWithAll,
} from '@/entities/admin/inquirues';

const inquirySearchOptions: Option[] = [
  { value: 'email', label: '작성자 이메일' },
];
const allInquiryStatuses: InquiryStatus[] = Object.keys(
  inquiryStatusMap,
) as InquiryStatus[];

const inquiryStatusOptions: Option<InquiryStatusWithAll>[] = [
  { value: 'ALL', label: '전체' },
  ...allInquiryStatuses.map((status) => ({
    value: status,
    label: inquiryStatusMap[status],
  })),
];

const AdminInquiriesPage = () => {
  const [searchKey, setSearchKey] = useState<InquirySearchKey>('email');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedStatus, setSelectedStatus] =
    useState<InquiryStatusWithAll>('ALL');

  return (
    <div>
      <SearchBar<InquirySearchKey>
        options={inquirySearchOptions}
        searchKey={searchKey}
        keyword={keyword}
        onSearchKeyChange={setSearchKey}
        onKeywordChange={setKeyword}
      />
      <StatusBar<InquiryStatus>
        options={inquiryStatusOptions}
        selectedValue={selectedStatus}
        onSelectedValueChange={setSelectedStatus}
      />
      <LocalErrorBoundary>
        <InquiryList
          searchKey={searchKey}
          keyword={keyword}
          status={selectedStatus}
        />
      </LocalErrorBoundary>
    </div>
  );
};

export default AdminInquiriesPage;
