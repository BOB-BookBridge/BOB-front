import axiosInstance from '@/shared/config/axios';
import {
  GetBannerNoticeRes,
  GetNoticeRes,
  PostAlertNoticeReq,
  PostBannerNoticeReq,
} from '.';

export const getBannerNotice = async (): Promise<GetBannerNoticeRes | null> => {
  const { data, status } = await axiosInstance.get('/notices/banner');
  if (status === 204) return null;
  return data;
};

export const postBannerNotice = async (payload: PostBannerNoticeReq) => {
  const { data } = await axiosInstance.post('/notices/banner', payload);
  return data;
};

export const patchBannerNotice = async () => {
  const { data } = await axiosInstance.patch('/notices/banner');
  return data;
};

export const getAlertNotices = async (): Promise<GetNoticeRes[]> => {
  const { data } = await axiosInstance.get('/notices/alerts');
  return data;
};

export const getNotice = async (id: number): Promise<GetNoticeRes> => {
  const { data } = await axiosInstance.get(`/notices/${id}`);
  return data;
};

export const postAlertNotice = async (payload: PostAlertNoticeReq) => {
  const { data } = await axiosInstance.post('/notices/alerts', payload);
  return data;
};
