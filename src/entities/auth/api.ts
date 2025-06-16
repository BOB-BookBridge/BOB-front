import axiosInstance from '@/shared/config/axios';
import { patchAreaProps, postJoinProps } from './type';

export const postEmailVerify = async ({ email }: { email: string }) => {
  const { data } = await axiosInstance.post('/auth/email', { email });
  return data;
};

export const postCodeVerify = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  const { data } = await axiosInstance.post('/auth/email/confirm', {
    email,
    code,
  });
  return data;
};

export const patchArea = async (area: patchAreaProps) => {
  const { data } = await axiosInstance.patch('/areas/authentication', area);
  return data;
};

export const postJoin = async (user: postJoinProps) => {
  const { data } = await axiosInstance.post('/members', user);
  return data;
};
