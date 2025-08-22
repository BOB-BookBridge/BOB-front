import { useRouter } from 'next/navigation';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteLike,
  getFavorites,
  getPost,
  getPosts,
  postLike,
  postListing,
  getPostsProps,
  postListingProps,
  deleteListing,
  patchListingProps,
  patchListing,
} from '.';
import { queryClient } from '@/shared/lib';

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

export const useListingDetailQuery = (postId?: number) => {
  return useQuery({
    queryKey: ['listingDetail', postId],
    queryFn: () => getPost(postId!),
    enabled: !!postId,
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

type useLikeProps = {
  postId: number;
  like: boolean;
};

export const useLikeMutation = () => {
  return useMutation<void, Error, useLikeProps>({
    mutationFn: async ({ postId, like }) => {
      return like ? postLike(postId) : deleteLike(postId);
    },
  });
};

type usePatchListingProps = {
  postId: number;
  listing: patchListingProps;
};
export const usePatchListingMutation = () => {
  const router = useRouter();
  return useMutation<void, Error, usePatchListingProps>({
    mutationFn: (data) => patchListing(data),
    onSuccess: (_data, variables) =>
      router.replace(`/listings/${variables.postId}`),
  });
};

export const useDeleteListingMutation = () => {
  return useMutation<void, Error, number>({
    mutationFn: (data) => deleteListing(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listing', 'all'] });
    },
  });
};
