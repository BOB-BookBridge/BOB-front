import axiosInstance from '@/shared/config/axios';
import {
  GetDashboardBasicRes,
  GetDashboardMembersRes,
  GetDashboardPostRes,
  GetDashboardReq,
  GetDashboardTradeRes,
} from '.';

export const getDashboardBasic = async (): Promise<GetDashboardBasicRes> => {
  const { data } = await axiosInstance.get('/statistics/basic');
  return data;
};

export const getDashboardMembers = async (
  params: GetDashboardReq,
): Promise<GetDashboardMembersRes> => {
  const { data } = await axiosInstance.get('/statistics/members', { params });
  return data;
};

export const getDashboardPost = async (
  params: GetDashboardReq,
): Promise<GetDashboardPostRes> => {
  const { data } = await axiosInstance.get('/statistics/posts', { params });
  return data;
};

export const getDashboardTrade = async (
  params: GetDashboardReq,
): Promise<GetDashboardTradeRes> => {
  const { data } = await axiosInstance.get('/statistics/trades', { params });
  return data;
};
