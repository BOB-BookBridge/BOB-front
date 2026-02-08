'use client';

import { useParams } from 'next/navigation';
import { ReportDetail } from '@/features/admin/ui';

const ReportDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  return <ReportDetail id={Number(id)} />;
};

export default ReportDetailPage;
