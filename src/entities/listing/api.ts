import {
  getPostsProps,
  GetPostsResponse,
  ListingDetailProps,
  patchListingProps,
  postListingProps,
} from '.';
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

export const patchListing = async ({
  postId,
  listing,
}: {
  postId: number;
  listing: patchListingProps;
}) => {
  const { data } = await axiosInstance.patch(`/posts/${postId}`, listing);
  return data;
};

export const deleteListing = async (postId: number) => {
  const { data } = await axiosInstance.delete(`/posts/${postId}`);
  return data;
};

export const postLike = async (postId: number) => {
  const { data } = await axiosInstance.post(`/posts/${postId}/favorite`);
  return data;
};

export const deleteLike = async (postId: number) => {
  const { data } = await axiosInstance.delete(`/posts/${postId}/favorite`);
  return data;
};
