import axiosInstance from '@/shared/config/axios';
import { patchAreaProps, postLoginProps, postSignUpProps } from './type';

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

export const postSignUp = async (user: postSignUpProps) => {
  const { data } = await axiosInstance.post('/members', user);
  return data;
};

export const postLogin = async (user: postLoginProps) => {
  const { data } = await axiosInstance.post('/auth/login', user);
  return data;
};

export const postLogout = async () => {
  const { data } = await axiosInstance.post('/auth/logout');
  return data;
};
