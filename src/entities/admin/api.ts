import axiosInstance from '@/shared/config/axios';
import {
  GetMemberListReq,
  GetMemberListRes,
  GetMemberRes,
  PatchMemberReq,
} from '.';

export const getMemberList = async (
  params: GetMemberListReq,
): Promise<GetMemberListRes> => {
  const { data } = await axiosInstance.get('/management/members', {
    params: params,
  });
  return data;
};

export const getMemberDetail = async (id: string): Promise<GetMemberRes> => {
  const { data } = await axiosInstance.get(`/management/members/${id}`);
  return data;
};

export const patchMemberStatus = async ({
  id,
  req,
}: {
  id: string;
  req: PatchMemberReq;
}) => {
  const { data } = await axiosInstance.patch(`/management/members/${id}`, req);
  return data;
};
