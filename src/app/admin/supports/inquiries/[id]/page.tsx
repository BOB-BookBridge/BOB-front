'use client';

import { useParams } from 'next/navigation';
import { InquiryDetail } from '@/features/admin/ui';

const InquiryDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  return <InquiryDetail id={Number(id)} />;
};

export default InquiryDetailPage;
