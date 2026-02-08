import { GetReportRes, GetReportsReq, GetReportsRes, PatchReportReq } from '.';
import axiosInstance from '@/shared/config/axios';

export const getReports = async (
  params: GetReportsReq,
): Promise<GetReportsRes> => {
  const { data } = await axiosInstance.get(`/management/reports`, { params });
  return data;
};

export const getReport = async (reportId: number): Promise<GetReportRes> => {
  const { data } = await axiosInstance.get(`/management/reports/${reportId}`);
  return data;
};

export const patchReport = async (id: number, payload: PatchReportReq) => {
  const { data } = await axiosInstance.patch(
    `/management/reports/${id}`,
    payload,
  );
  return data;
};
