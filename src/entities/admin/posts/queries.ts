import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib';
import {
  deleteFilterKeyword,
  getAdminPost,
  getAdminPosts,
  GetAdminPostsReq,
  getFilterKeyword,
  patchAdminPost,
  patchAdminPostReq,
  postFilterKeyword,
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

export const useFilterKeywordQuery = () => {
  return useQuery({
    queryKey: ['filter-keyword'],
    queryFn: () => getFilterKeyword(),
  });
};

export const useAddFilterKeywordMutation = () => {
  return useMutation({
    mutationFn: (word: string) => postFilterKeyword(word),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filter-keyword'] });
    },
  });
};

export const useDeleteFilterKeywordMutation = () => {
  return useMutation({
    mutationFn: (id: number) => deleteFilterKeyword(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filter-keyword'] });
    },
  });
};
