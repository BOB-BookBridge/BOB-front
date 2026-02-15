import axiosInstance from '@/shared/config/axios';
import {
  GetAdminPostRes,
  GetAdminPostsReq,
  GetAdminPostsRes,
  KeywordModel,
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

export const getFilterKeyword = async (): Promise<KeywordModel[]> => {
  const { data } = await axiosInstance.get('/management/filter-words');
  return data;
};

export const postFilterKeyword = async (word: string) => {
  const { data } = await axiosInstance.post('/management/filter-words', {
    word,
  });
  return data;
};

export const deleteFilterKeyword = async (id: number) => {
  const { data } = await axiosInstance.delete(`/management/filter-words/${id}`);
  return data;
};
