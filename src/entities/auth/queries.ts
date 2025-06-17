import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { patchArea, postCodeVerify, postEmailVerify, postSignUp } from './api';
import { patchAreaProps, postSignUpProps } from './type';

export const useSignupMutation = () => {
  const router = useRouter();

  return useMutation<void, Error, postSignUpProps>({
    mutationFn: (data) => postSignUp(data),
    onSuccess: () => {
      toast.success('회원가입 완료!');
      router.replace('/');
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
    onSuccess: () => {
      toast.success('인증 완료! 계속 진행해 주세요');
    },
  });
};
