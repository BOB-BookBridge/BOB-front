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

export const passwordSignupRule = {
  required: VALIDATION_MESSAGES.required('비밀번호'),
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,20}$/,
    message: VALIDATION_MESSAGES.password,
  },
};

export const required = (label: string) => ({
  required: VALIDATION_MESSAGES.required(label),
});
