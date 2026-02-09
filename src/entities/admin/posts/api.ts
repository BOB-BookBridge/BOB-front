import axiosInstance from '@/shared/config/axios';
import {
  GetAdminPostRes,
  GetAdminPostsReq,
  GetAdminPostsRes,
  patchAdminPostReq,
} from '.';

export const getAdminPosts = async (
  params: GetAdminPostsReq,
): Promise<GetAdminPostsRes> => {
  const { data } = await axiosInstance.get('/management/posts', { params });
  return data;
};

export const getAdminPost = async (
  postId: number,
): Promise<GetAdminPostRes> => {
  const { data } = await axiosInstance.get(`/management/posts/${postId}`);
  return data;
};

export const patchAdminPost = async (
  postId: number,
  payload: patchAdminPostReq,
) => {
  const { data } = await axiosInstance.patch(
    `/management/posts/${postId}`,
    payload,
  );
  return data;
};
