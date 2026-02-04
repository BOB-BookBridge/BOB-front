import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib';
import {
  getInquiries,
  getInquiry,
  patchInquiry,
  GetInquiriesReq,
  PatchInquiryReq,
} from '.';

export const useInquiriesQuery = (param: GetInquiriesReq) => {
  return useQuery({
    queryKey: ['inquiries', param.email, param.status, param.page, param.size],
    queryFn: () => getInquiries(param),
  });
};

export const useInquiryQuery = (id: number) => {
  return useQuery({
    queryKey: ['inquiry', id],
    queryFn: () => getInquiry(id),
  });
};

export const useAdminInquiryMutation = (id: number) => {
  return useMutation({
    mutationFn: (payload: PatchInquiryReq) => patchInquiry(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiry', id] });
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
};
