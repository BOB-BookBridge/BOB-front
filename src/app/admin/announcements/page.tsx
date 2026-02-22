'use client';

import { AlertSection, BannerSection } from '@/features/admin/ui';
import { LocalErrorBoundary } from '@/shared/lib';

const AdminAnnouncementPage = () => {
  return (
    <>
      <LocalErrorBoundary>
        <BannerSection />
      </LocalErrorBoundary>
      <LocalErrorBoundary>
        <AlertSection />
      </LocalErrorBoundary>
    </>
  );
};

export default AdminAnnouncementPage;
