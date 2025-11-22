import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib';
import {
  patchArea,
  postCodeVerify,
  postEmailVerify,
  postLogin,
  postLogout,
  postSignUp,
  patchAreaProps,
  postLoginProps,
  postSignUpProps,
} from '.';

export const useSignupMutation = () => {
  const login = useLoginMutation();

  return useMutation<void, Error, postSignUpProps>({
    mutationFn: (data) => postSignUp(data),
    onSuccess: (_, variables) => {
      toast.success('회원가입 완료!');
      login.mutate({ email: variables.email, password: variables.password });
    },
  });
};

export const useEmailVerifyMutation = () => {
  return useMutation<void, Error, { email: string }>({
    mutationFn: (data) => postEmailVerify(data),
    onSuccess: () => {
      toast.success('이메일 전송! 메일함을 확인해 주세요');
    },
  });
};

export const useCodeVerifyMutation = () => {
  return useMutation<void, Error, { email: string; code: string }>({
    mutationFn: (data) => postCodeVerify(data),
    onSuccess: () => {
      toast.success('인증 완료! 계속 진행해 주세요');
    },
  });
};

export const useAreaMutation = () => {
  return useMutation<void, Error, patchAreaProps>({
    mutationFn: (data) => patchArea(data),
    onSuccess: async () => {
      toast.success('인증 완료');
      await queryClient.invalidateQueries({ queryKey: ['my'] });
    },
  });
};

export const useLoginMutation = () => {
  const router = useRouter();
  return useMutation<void, Error, postLoginProps>({
    mutationFn: (data) => postLogin(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['my'] });
      router.replace('/');
    },
  });
};

export const useLogoutMutation = () => {
  const router = useRouter();
  return useMutation<void, Error>({
    mutationFn: postLogout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['my'] });
      router.replace('/');
    },
  });
};
