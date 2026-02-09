import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib';
import {
  getAdminPost,
  getAdminPosts,
  GetAdminPostsReq,
  patchAdminPost,
  patchAdminPostReq,
} from '.';

export const useAdminPostsQuery = (param: GetAdminPostsReq) => {
  return useQuery({
    queryKey: ['posts', param.email, param.status, param.page, param.size],
    queryFn: () => getAdminPosts(param),
  });
};

export const useAdminPostQuery = (id: number) => {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getAdminPost(id),
  });
};

export const useAdminPostMutation = (id: number) => {
  return useMutation({
    mutationFn: (payload: patchAdminPostReq) => patchAdminPost(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
