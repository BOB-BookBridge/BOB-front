import { useMutation } from '@tanstack/react-query';
import { postReportChat, PostReportModel, postReportPost } from '.';

export const useReportChatMutation = () => {
  return useMutation({
    mutationFn: (data: PostReportModel) => postReportChat(data),
  });
};

export const useReportPostMutation = () => {
  return useMutation({
    mutationFn: (data: PostReportModel) => postReportPost(data),
  });
};
