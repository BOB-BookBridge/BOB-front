import { useRouter } from 'next/navigation';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib';
import {
  deleteLike,
  getFavorites,
  getPost,
  getPosts,
  postLike,
  postListing,
  getPostsReq,
  postListingReq,
  deleteListing,
  patchListingReq,
  patchListing,
} from '.';

export const useListingQuery = (filter: getPostsReq) => {
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
  id: number;
};

export const usePostMutation = () => {
  const router = useRouter();
  return useMutation<usePostType, Error, postListingReq>({
    mutationFn: (data) => postListing(data),
    onSuccess: ({ id }: usePostType) => router.replace(`/listings/${id}`),
  });
};

type useLikeProps = {
  postId: number;
  like: boolean;
};

export const useLikeMutation = (postId: number) => {
  return useMutation<void, Error, useLikeProps>({
    mutationFn: async ({ postId, like }) => {
      return like ? postLike(postId) : deleteLike(postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['listingDetail', postId] });
    },
  });
};

type usePatchListingProps = {
  postId: number;
  listing: patchListingReq;
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
