'use client';

import { useParams } from 'next/navigation';
import { PostDetail } from '@/features/admin/ui';

const PostDetailPage = () => {
  const params = useParams();
  const id = params.id as string;

  return <PostDetail id={Number(id)} />;
};

export default PostDetailPage;
