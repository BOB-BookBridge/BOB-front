import { getPostsProps, GetPostsResponse } from './types';
import axiosInstance from '@/shared/config/axios';

export const getPosts = async (
  filter: getPostsProps,
): Promise<GetPostsResponse> => {
  const { data } = await axiosInstance.get('/posts', {
    params: filter,
  });
  return data;
};
