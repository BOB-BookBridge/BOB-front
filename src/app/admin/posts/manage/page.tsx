'use client';
import { useState } from 'react';
import { adminPostStatusMap, LocalErrorBoundary } from '@/shared/lib';
import { PostList, SearchBar, StatusBar } from '@/features/admin/ui';
import { Option } from '@/entities/admin';
import {
  AdminPostStatus,
  AdminPostStatusWithAll,
  PostSearchKey,
} from '@/entities/admin/posts';

const postSearchOptions: Option[] = [{ value: 'email', label: '이메일' }];
const allInquiryStatuses: AdminPostStatus[] = Object.keys(
  adminPostStatusMap,
) as AdminPostStatus[];

const postStatusOptions: Option<AdminPostStatusWithAll>[] = [
  { value: 'ALL', label: '전체' },
  ...allInquiryStatuses.map((status) => ({
    value: status,
    label: adminPostStatusMap[status],
  })),
];
const AdminPostsPage = () => {
  const [searchKey, setSearchKey] = useState<PostSearchKey>('email');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedStatus, setSelectedStatus] =
    useState<AdminPostStatusWithAll>('ALL');

  return (
    <>
      <SearchBar<PostSearchKey>
        options={postSearchOptions}
        searchKey={searchKey}
        keyword={keyword}
        onSearchKeyChange={setSearchKey}
        onKeywordChange={setKeyword}
      />
      <StatusBar<AdminPostStatus>
        options={postStatusOptions}
        selectedValue={selectedStatus}
        onSelectedValueChange={setSelectedStatus}
      />
      <LocalErrorBoundary>
        <PostList
          searchKey={searchKey}
          keyword={keyword}
          status={selectedStatus}
        />
      </LocalErrorBoundary>
    </>
  );
};

export default AdminPostsPage;
