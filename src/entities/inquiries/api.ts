import axiosInstance from '@/shared/config/axios';
import { PostInquiryReq } from '.';

export const postInquiry = async (req: PostInquiryReq) => {
  const data = await axiosInstance.post('/inquiries', req);
  return data;
};
