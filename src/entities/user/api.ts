import axiosInstance from '@/shared/config/axios';

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
