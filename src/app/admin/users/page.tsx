'use client';

import { SearchBar, UserList } from '@/features/admin/ui';

const AdminUsersPage = () => {
  return (
    <div>
      <SearchBar /> <UserList />
    </div>
  );
};

export default AdminUsersPage;
