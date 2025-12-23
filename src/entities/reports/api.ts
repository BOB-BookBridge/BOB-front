import axiosInstance from '@/shared/config/axios';
import { PostReportModel } from '.';

export const postReportChat = async ({ id, req }: PostReportModel) => {
  const { data } = await axiosInstance.post(`/reports/chats/${id}`, req);
  return data;
};

export const postReportPost = async ({ id, req }: PostReportModel) => {
  const { data } = await axiosInstance.post(`/reports/posts/${id}`, req);
  return data;
};
