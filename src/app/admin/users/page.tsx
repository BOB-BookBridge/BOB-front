'use client';

import { useState } from 'react';
import { SearchBar, UserList } from '@/features/admin/ui';
import { Option, UserSearchKey } from '@/entities/admin';
import { LocalErrorBoundary } from '@/shared/lib';

const userSearchOptions: Option[] = [
  { value: 'email', label: '이메일' },
  { value: 'nickname', label: '닉네임' },
];

const AdminUsersPage = () => {
  const [searchKey, setSearchKey] = useState<UserSearchKey>('email');
  const [keyword, setKeyword] = useState<string>('');

  return (
    <div>
      <SearchBar<UserSearchKey>
        options={userSearchOptions}
        searchKey={searchKey}
        keyword={keyword}
        onSearchKeyChange={setSearchKey}
        onKeywordChange={setKeyword}
      />
      <LocalErrorBoundary>
        <UserList searchKey={searchKey} keyword={keyword} />
      </LocalErrorBoundary>
    </div>
  );
};

export default AdminUsersPage;
