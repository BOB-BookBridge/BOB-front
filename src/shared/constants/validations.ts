import { RegisterOptions } from 'react-hook-form';
import { VALIDATION_MESSAGES } from '.';

export const emailRule = {
  required: VALIDATION_MESSAGES.required('이메일'),
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: VALIDATION_MESSAGES.email,
  },
};

export const passwordBasicRule = {
  required: VALIDATION_MESSAGES.required('비밀번호'),
};

export const codeBasicRule = {
  required: VALIDATION_MESSAGES.required('인증 코드'),
};

export const passwordSignupRule = {
  required: VALIDATION_MESSAGES.required('비밀번호'),
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,20}$/,
    message: VALIDATION_MESSAGES.password,
  },
};

export const passwordConfirmRule = (
  getValues: () => { password: string },
): RegisterOptions<{ passwordConfirm: string }, 'passwordConfirm'> => ({
  required: VALIDATION_MESSAGES.required('비밀번호 확인'),
  validate: (value) => {
    return (
      value === getValues().password || VALIDATION_MESSAGES.passwordConfirm
    );
  },
});

export const nicknameRule = {
  required: VALIDATION_MESSAGES.required('별명'),
  pattern: {
    value: /^.{1,12}$/,
    message: VALIDATION_MESSAGES.nickname.tooLong,
  },
};

export const required = (label: string) => ({
  required: VALIDATION_MESSAGES.required(label),
});
