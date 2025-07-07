import {
  getPostsProps,
  GetPostsResponse,
  ListingDetailProps,
  postListingProps,
} from './types';
import axiosInstance from '@/shared/config/axios';

export const getPosts = async (
  filter: getPostsProps,
): Promise<GetPostsResponse> => {
  const { data } = await axiosInstance.get('/posts', {
    params: filter,
  });
  return data;
};

export const getPost = async (postId: number): Promise<ListingDetailProps> => {
  const { data } = await axiosInstance.get(`/posts/${postId}`);
  return data;
};

export const getFavorites = async ({
  page,
  size,
}: {
  page?: number;
  size?: number;
}): Promise<GetPostsResponse> => {
  const { data } = await axiosInstance.get('/posts/favorites', {
    params: { page, size },
  });
  return data;
};

export const postListing = async (listing: postListingProps) => {
  const { data } = await axiosInstance.post('/posts', listing);
  return data;
};
