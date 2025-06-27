import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsProps } from './types';
import { getPosts } from './api';

export const useListingQuery = (filter: getPostsProps) => {
  return useInfiniteQuery({
    queryKey: ['listing', filter.memberId ?? 'all', filter],
    queryFn: ({ pageParam = 0 }) => getPosts({ ...filter, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (sum, page) => sum + page.posts.length,
        0,
      );
      return totalFetched < lastPage.totalCount ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });
};
