'use client';

import { useState } from 'react';
import { SearchKeyType } from '@/features/admin/ui/users/SearchBar';
import { SearchBar, UserList } from '@/features/admin/ui';
import { LocalErrorBoundary } from '@/shared/lib';

const AdminUsersPage = () => {
  const [searchKey, setSearchKey] = useState<SearchKeyType>('email');
  const [keyword, setKeyword] = useState<string>('');
  return (
    <div>
      <SearchBar
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
