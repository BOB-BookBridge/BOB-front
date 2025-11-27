import {
  getPostsReq,
  GetPostsRes,
  ListingDetailRes,
  patchListingReq,
  postListingReq,
} from '.';
import axiosInstance from '@/shared/config/axios';

export const getPosts = async (filter: getPostsReq): Promise<GetPostsRes> => {
  const { data } = await axiosInstance.get('/posts', {
    params: filter,
  });
  return data;
};

export const getPost = async (postId: number): Promise<ListingDetailRes> => {
  const { data } = await axiosInstance.get(`/posts/${postId}`);
  return data;
};

export const getFavorites = async ({
  page,
  size,
}: {
  page?: number;
  size?: number;
}): Promise<GetPostsRes> => {
  const { data } = await axiosInstance.get('/posts/favorites', {
    params: { page, size },
  });
  return data;
};

export const postListing = async (listing: postListingReq) => {
  const { data } = await axiosInstance.post('/posts', listing);
  return data;
};

export const patchListing = async ({
  postId,
  listing,
}: {
  postId: number;
  listing: patchListingReq;
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
