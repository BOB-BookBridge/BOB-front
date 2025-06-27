import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getFavorites, getPost, getPosts } from './api';
import { getPostsProps } from './types';

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

export const useListingDetailQuery = (postId: number) => {
  return useQuery({
    queryKey: ['listingDetail'],
    queryFn: () => getPost(postId),
  });
};

export const useFavoritesQuery = () => {
  return useInfiniteQuery({
    queryKey: ['favorites'],
    queryFn: ({ pageParam = 0 }) => getFavorites({ page: pageParam, size: 12 }),
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
