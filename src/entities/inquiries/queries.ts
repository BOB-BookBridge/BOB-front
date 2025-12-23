import { useMutation } from '@tanstack/react-query';
import { postInquiry } from './api';
import { PostInquiryReq } from './types';

export const useInquiryMutation = () => {
  return useMutation({
    mutationFn: (req: PostInquiryReq) => postInquiry(req),
  });
};
