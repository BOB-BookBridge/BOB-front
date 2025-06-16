'use client';

import Link from 'next/link';
import styled from 'styled-components';
import { colors, emailRule } from '@/shared/constants';
import { InputGroup } from '@/shared/ui';
import { useForm, useWatch } from 'react-hook-form';
import { StyledButton } from './signup/SignUpForm.styles';
import { useState } from 'react';
import { ErrorIcon, SuccessIcon } from '@/shared/assets/icons';
import Logo from '@/shared/assets/logo-text.svg';

const PasswordRequestLayout = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm<{ email: string }>({
    mode: 'onChange',
  });

  const email = useWatch({ name: 'email', control });
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const isDisabled = !email || Object.keys(errors).length > 0;

  const message =
    isSuccess === null
      ? ''
      : isSuccess
        ? '해당 이메일로 임시 비밀번호를 전송했습니다\n메일함을 확인해주세요'
        : '해당 이메일로 가입된 계정을 찾을 수 없습니다\n이메일을 다시 확인해주세요';

  function handleClickConfirm() {
    setIsSuccess((prev) => {
      if (prev === null) return true;
      else return !prev;
    });
  }
  return (
    <Container>
      <Link href='/'>
        <Logo width={150} />
      </Link>
      <InputGroup
        inputs={[
          {
            name: 'email',
            placeholder: '가입하신 이메일을 입력해주세요',
            rules: emailRule,
            rightElement: (
              <StyledButton
                disabled={isDisabled}
                onClick={handleClickConfirm}
                type='CONFIRM'>
                확인
              </StyledButton>
            ),
          },
        ]}
        register={register}
        errors={errors}
      />
      {isSuccess !== null && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {isSuccess ? <SuccessIcon /> : <ErrorIcon />}
          <p
            style={{
              fontSize: 14,
              whiteSpace: 'pre-line',
              textAlign: 'center',
            }}>
            {message}
          </p>
        </div>
      )}
    </Container>
  );
};
export default PasswordRequestLayout;

const Container = styled.div`
  max-width: 370px;
  width: 100%;
  border: 1px solid ${colors.dark.GRAY_500};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;
