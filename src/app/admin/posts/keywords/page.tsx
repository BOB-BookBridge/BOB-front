'use client';
import { KeywordManagement } from '@/features/admin/ui';
import { LocalErrorBoundary } from '@/shared/lib';

const AdminPostKeywordsPage = () => {
  return (
    <LocalErrorBoundary>
      <KeywordManagement />
    </LocalErrorBoundary>
  );
};

export default AdminPostKeywordsPage;
