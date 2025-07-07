import { useRouter } from 'next/navigation';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { getFavorites, getPost, getPosts, postListing } from './api';
import { getPostsProps, postListingProps } from './types';

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

export const useFavoritesQuery = (enabled: boolean) => {
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
    enabled: enabled,
  });
};

type usePostType = {
  postId: number;
};
export const usePostMutation = () => {
  const router = useRouter();
  return useMutation<usePostType, Error, postListingProps>({
    mutationFn: (data) => postListing(data),
    onSuccess: ({ postId }: usePostType) =>
      router.replace(`/listings/${postId}`),
  });
};
