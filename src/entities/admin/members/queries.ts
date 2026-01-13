import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getMemberDetail,
  getMemberList,
  GetMemberListReq,
  PatchMemberReq,
  patchMemberStatus,
} from '.';
import { queryClient, showToast } from '@/shared/lib';

export const useMemberListQuery = (params: GetMemberListReq) => {
  return useQuery({
    queryKey: ['memberList', params.page, params.key, params.keyword],
    queryFn: () => getMemberList(params),
  });
};

export const useMemberDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ['member', id],
    queryFn: () => getMemberDetail(id),
  });
};

export const useMemberStatusMutation = () => {
  return useMutation({
    mutationFn: ({ id, req }: { id: string; req: PatchMemberReq }) =>
      patchMemberStatus({ id, req }),
    onSuccess: async (_, variables) => {
      showToast.success('회원의 상태가 변경되었습니다');

      await queryClient.invalidateQueries({
        queryKey: ['member', variables.id],
      });

      await queryClient.invalidateQueries({
        queryKey: ['memberList'],
      });
    },
  });
};
