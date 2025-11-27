import axiosInstance from '@/shared/config/axios';
import { BookModel } from '../listing';
import {
  Bookcase,
  GetBookcaseReq,
  PostBookcaseReq,
  patchPasswordReq,
  UserProfileRes,
  patchMyInfoReq,
} from '.';

export const getMyProfile = async (): Promise<UserProfileRes> => {
  const { data } = await axiosInstance.get('/members/me');
  return data;
};

export const patchMyInfo = async (req: patchMyInfoReq) => {
  const { data } = await axiosInstance.patch('/members/me', req);
  return data;
};

export const patchPassword = async (password: patchPasswordReq) => {
  const { data } = await axiosInstance.patch('/members/me/password', password);
  return data;
};

export const patchTempPassword = async (email: string) => {
  const { data } = await axiosInstance.patch('/members/temp/password', {
    email,
  });
  return data;
};

export const deleteUser = async () => {
  const { data } = await axiosInstance.delete('/members/me');
  return data;
};

export const getUserProfile = async (id: string): Promise<UserProfileRes> => {
  const { data } = await axiosInstance.get(`/members/${id}`);
  return data;
};

export const postBookcaseItem = async (book: PostBookcaseReq) => {
  const { data } = await axiosInstance.post('/members/books', book);
  return data;
};

export const getBookcase = async (
  prop: GetBookcaseReq,
): Promise<Bookcase[]> => {
  const { memberId, key, require } = prop;
  const { data } = await axiosInstance.get(`/members/${memberId}/books`, {
    params: {
      ...(key && { key }),
      ...(require && { require }),
    },
  });
  return data.bookcase;
};

export const deleteBookcaseItem = async (bookItemId: number) => {
  const { data } = await axiosInstance.delete(`/members/books/${bookItemId}`);
  return data;
};

export const getWishes = async (memberId: string) => {
  const { data } = await axiosInstance.get(`members/${memberId}/wishes`);
  return data;
};

export const postWishItem = async (req: BookModel) => {
  const { data } = await axiosInstance.post('/members/wishes', req);
  return data;
};

export const deleteWishItem = async (wishItemId: number) => {
  const { data } = await axiosInstance.delete(`/members/wishes/${wishItemId}`);
  return data;
};
