import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { queryClient, showToast } from '@/shared/lib';
import {
  postArea,
  postCodeVerify,
  postEmailVerify,
  postLogin,
  postLogout,
  postSignUp,
  postAreaReq,
  postLoginReq,
  postSignUpReq,
} from '.';

export const useSignupMutation = () => {
  const login = useLoginMutation();

  return useMutation<void, Error, postSignUpReq>({
    mutationFn: (data) => postSignUp(data),
    onSuccess: (_, variables) => {
      showToast.success('회원가입이 완료되었습니다.');
      login.mutate({ email: variables.email, password: variables.password });
    },
  });
};

export const useEmailVerifyMutation = () => {
  return useMutation<void, Error, { email: string }>({
    mutationFn: (data) => postEmailVerify(data),
    onSuccess: () => {
      showToast.success('메일이 전송되었으니 메일함을 확인해주세요.');
    },
  });
};

export const useCodeVerifyMutation = () => {
  return useMutation<void, Error, { email: string; code: string }>({
    mutationFn: (data) => postCodeVerify(data),
    onSuccess: () => {
      showToast.success('인증이 완료되었습니다. 계속 진행해주세요.');
    },
  });
};

export const useAreaMutation = () => {
  return useMutation<void, Error, postAreaReq>({
    mutationFn: (data) => postArea(data),
  });
};

export const useLoginMutation = () => {
  const router = useRouter();
  return useMutation<void, Error, postLoginReq>({
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
