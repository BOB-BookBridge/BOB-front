'use client';
import { useState } from 'react';
import { adminPostStatusMap, LocalErrorBoundary } from '@/shared/lib';
import { PostList, SearchBar, StatusBar } from '@/features/admin/ui';
import { Option } from '@/entities/admin';
import {
  AdminFilterPostStatusWithAll,
  AdminFilterPostStatus,
  PostSearchKey,
} from '@/entities/admin/posts';

const postSearchOptions: Option[] = [{ value: 'email', label: '이메일' }];
const allPostStatuses: AdminFilterPostStatus[] = Object.keys(
  adminPostStatusMap,
) as AdminFilterPostStatus[];

const postStatusOptions: Option<AdminFilterPostStatusWithAll>[] = [
  { value: 'ALL', label: '전체' },
  ...allPostStatuses.map((status) => ({
    value: status,
    label: adminPostStatusMap[status],
  })),
];
const AdminPostsPage = () => {
  const [searchKey, setSearchKey] = useState<PostSearchKey>('email');
  const [keyword, setKeyword] = useState<string>('');
  const [selectedStatus, setSelectedStatus] =
    useState<AdminFilterPostStatusWithAll>('ALL');

  return (
    <>
      <SearchBar<PostSearchKey>
        options={postSearchOptions}
        searchKey={searchKey}
        keyword={keyword}
        onSearchKeyChange={setSearchKey}
        onKeywordChange={setKeyword}
      />
      <StatusBar<AdminFilterPostStatus>
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
