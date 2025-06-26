import axiosInstance from '@/shared/config/axios';

export const getMyProfile = async () => {
  const { data } = await axiosInstance.get('/members/me');
  return data;
};

export interface patchMyInfoProps {
  nickname?: string;
  area?: number;
}

export const patchMyInfo = async (change: patchMyInfoProps) => {
  const { data } = await axiosInstance.patch('/members/me', change);
  return data;
};
