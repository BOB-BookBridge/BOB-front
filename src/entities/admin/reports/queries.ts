import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib';
import {
  getReport,
  getReports,
  GetReportsReq,
  patchReport,
  PatchReportReq,
} from '.';

// 이메일 검색 -> 검색 결과가 없을 시 에러를 반환해서 일단 throwOnError를 false 처리 함
export const useReportsQuery = (param: GetReportsReq) => {
  return useQuery({
    queryKey: [
      'reports',
      param.page,
      param.size,
      param.reportedEmail,
      param.reporterEmail,
      param.status,
      param.type,
    ],
    queryFn: () => getReports(param),
    throwOnError: false,
  });
};

export const useReportQuery = (id: number) => {
  return useQuery({
    queryKey: ['report', id],
    queryFn: () => getReport(id),
  });
};

export const useReportMutation = (id: number) => {
  return useMutation({
    mutationFn: (payload: PatchReportReq) => patchReport(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report', id] });
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });
};
