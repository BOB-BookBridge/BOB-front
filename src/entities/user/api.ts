import axiosInstance from '@/shared/config/axios';
import { UserProfileProps } from '.';

export const getMyProfile = async () => {
  const { data } = await axiosInstance.get('/members/me');
  return data;
};

export const patchNickname = async (nickname: string) => {
  const { data } = await axiosInstance.patch('/members/me', { nickname });
  return data;
};

export interface patchPasswordProps {
  oldPassword: string;
  newPassword: string;
}
export const patchPassword = async (password: patchPasswordProps) => {
  const { data } = await axiosInstance.patch('/members/me/password', password);
  return data;
};

export const patchTempPassword = async (email: string) => {
  const { data } = await axiosInstance.patch('/members/temp/password', {
    email,
  });
  return data;
};

export const getUserProfile = async (id: string): Promise<UserProfileProps> => {
  const { data } = await axiosInstance.get(`/members/${id}`);
  return data;
};
