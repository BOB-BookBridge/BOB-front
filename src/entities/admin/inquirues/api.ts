import axiosInstance from '@/shared/config/axios';
import {
  GetInquiriesReq,
  GetInquiriesRes,
  GetInquiryRes,
  PatchInquiryReq,
} from '.';

export const getInquiries = async (
  params: GetInquiriesReq,
): Promise<GetInquiriesRes> => {
  const { data } = await axiosInstance.get('/management/inquiries', {
    params,
  });
  return data;
};

export const getInquiry = async (id: number): Promise<GetInquiryRes> => {
  const { data } = await axiosInstance.get(`/inquiries/${id}`);
  return data;
};

export const patchInquiry = async (id: number, payload: PatchInquiryReq) => {
  const { data } = await axiosInstance.patch(
    `management/inquiries/${id}`,
    payload,
  );
  return data;
};
