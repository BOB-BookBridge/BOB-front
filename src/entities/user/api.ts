import axiosInstance from '@/shared/config/axios';

export const getMyProfile = async () => {
  const { data } = await axiosInstance.get('/members/me');
  return data;
};
