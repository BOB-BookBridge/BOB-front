'use client';

import { useForm, useWatch } from 'react-hook-form';
import { InputGroup, Button } from '@/shared/ui';
import { emailRule, passwordBasicRule } from '@/shared/constants';
import styled from 'styled-components';

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

  function handleClickLogin() {
    console.log('login');
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
`;
