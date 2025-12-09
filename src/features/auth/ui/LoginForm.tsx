'use client';

import styled from 'styled-components';
import { useForm, useWatch } from 'react-hook-form';
import { emailRule, passwordBasicRule } from '@/shared/constants';
import { useLoginMutation } from '@/entities/auth/queries';
import { InputGroup, Button } from '@/shared/ui';
import { showToast } from '@/shared/lib';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: 'onChange',
  });
  const email = useWatch({ name: 'email', control });
  const password = useWatch({ name: 'password', control });
  const disabled = !email || !password || Object.keys(errors).length > 0;

  const { mutate: login } = useLoginMutation();
  function handleClickLogin() {
    if (!email) {
      return showToast.error('이메일을 입력해 주세요.');
    }
    if (!password) {
      return showToast.error('비밀번호를 입력해 주세요.');
    }
    login({ email, password });
  }
  return (
    <Container>
      <InputGroup
        inputs={[
          {
            name: 'email',
            placeholder: '이메일',
            type: 'email',
            rules: emailRule,
          },
          {
            name: 'password',
            placeholder: '비밀번호',
            type: 'password',
            rules: passwordBasicRule,
          },
        ]}
        register={register}
        errors={errors}
        onEnter={handleClickLogin}
      />
      <Button
        text='로그인'
        variant={disabled ? 'disabled' : 'primary'}
        onClick={handleClickLogin}
      />
    </Container>
  );
};

export default LoginForm;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 300px;
`;
