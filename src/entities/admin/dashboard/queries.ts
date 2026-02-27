import { useQuery } from '@tanstack/react-query';
import {
  getDashboardBasic,
  getDashboardMembers,
  getDashboardPost,
  getDashboardTrade,
  GetDashboardReq,
} from '.';

export const dashboardQueryKeys = {
  all: ['dashboard'] as const,
  basic: () => [...dashboardQueryKeys.all, 'basic'] as const,
  members: (params: GetDashboardReq) =>
    [...dashboardQueryKeys.all, 'members', params] as const,
  post: (params: GetDashboardReq) =>
    [...dashboardQueryKeys.all, 'post', params] as const,
  trade: (params: GetDashboardReq) =>
    [...dashboardQueryKeys.all, 'trade', params] as const,
};

export const useDashboardBasic = () => {
  return useQuery({
    queryKey: dashboardQueryKeys.basic(),
    queryFn: getDashboardBasic,
  });
};

export const useDashboardMembers = (params: GetDashboardReq = {}) => {
  return useQuery({
    queryKey: dashboardQueryKeys.members(params),
    queryFn: () => getDashboardMembers(params),
  });
};

export const useDashboardPost = (params: GetDashboardReq = {}) => {
  return useQuery({
    queryKey: dashboardQueryKeys.post(params),
    queryFn: () => getDashboardPost(params),
  });
};

export const useDashboardTrade = (params: GetDashboardReq = {}) => {
  return useQuery({
    queryKey: dashboardQueryKeys.trade(params),
    queryFn: () => getDashboardTrade(params),
  });
};
