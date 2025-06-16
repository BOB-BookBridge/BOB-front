import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useForm, useWatch } from 'react-hook-form';
import {
  codeBasicRule,
  emailRule,
  passwordConfirmRule,
  passwordSignupRule,
  nicknameRule,
} from '@/shared/constants';
import { handleCodeRequest, handleEmailConfirm } from '@/features/auth/model';
import { Button, InputGroup, SelectAreaSection } from '@/shared/ui';
import { useEmailVerify } from '../../model/useEmailVerify';
import { useAreaVerify } from '../../model/useAreaVerify';
import { useAgreement } from '../../model/useAgreement';
import SignUpVerifyButton from './SignUpVerifyButton';
import { InputItem } from '@/shared/ui/InputGroup';
import AgreementSection from './AgreementSection';
import { postSignUp } from '@/entities/auth';
import * as S from './SignUpForm.styles';

interface SignUpFormValues {
  email: string;
  code: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}
const SignUpForm = () => {
  const {
    register,
    control,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    mode: 'onChange',
  });

  const email = useWatch({ name: 'email', control });
  const code = useWatch({ name: 'code', control });
  const password = useWatch({ name: 'password', control });
  const passwordConfirm = useWatch({ name: 'passwordConfirm', control });
  const nickname = useWatch({ name: 'nickname', control });

  const { emdId, isVerifiedArea, handleAreaChange, handleAreaVerified } =
    useAreaVerify();
  const { agreements, isCheckedAll, handleToggle, handleToggleAll } =
    useAgreement();

  const {
    isVerifiedEmail,
    showCodeInput,
    timeText,
    sendCodeDisabled,
    onCodeRequestSuccess,
    onEmailConfirmSuccess,
  } = useEmailVerify(email, !!errors.email);

  const router = useRouter();

  const isDisabled =
    !email ||
    !code ||
    !password ||
    !passwordConfirm ||
    !nickname ||
    !isVerifiedEmail ||
    !isCheckedAll ||
    !emdId ||
    !isVerifiedArea ||
    Object.keys(errors).length > 0;

  useEffect(() => {
    if (!!errors.password) trigger('passwordConfirm');
  }, [password]);

  const inputs = (): InputItem<SignUpFormValues>[] => {
    const baseInputs: InputItem<SignUpFormValues>[] = [
      {
        name: 'email',
        placeholder: '이메일',
        type: 'email',
        rules: emailRule,
        rightElement: (
          <SignUpVerifyButton
            text={
              showCodeInput
                ? isVerifiedEmail
                  ? '인증 완료'
                  : timeText
                : '인증 코드 요청'
            }
            disabled={sendCodeDisabled || showCodeInput}
            onClick={() =>
              handleCodeRequest({
                email,
                onSuccess: onCodeRequestSuccess,
              })
            }
          />
        ),
      },
    ];

    if (showCodeInput) {
      baseInputs.push({
        name: 'code',
        placeholder: '인증 코드',
        rules: codeBasicRule,
      });
    }

    return baseInputs;
  };

  async function handleClickSignUp() {
    if (isDisabled) return;
    try {
      await postSignUp({ nickname, email, password, emdId });
      alert('가입 완료');
      router.replace('/');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <S.Container>
      <InputGroup
        inputs={inputs()}
        register={register}
        errors={{ email: errors.email }}
      />
      {showCodeInput && !isVerifiedEmail && (
        <S.ButtonContainer>
          <S.StyledButton
            type='TRANSPARENT'
            onClick={() =>
              handleCodeRequest({
                email,
                onSuccess: onCodeRequestSuccess,
              })
            }>
            재요청
          </S.StyledButton>
          <S.StyledButton
            type='CONFIRM'
            onClick={() =>
              handleEmailConfirm({
                email,
                code,
                onSuccess: onEmailConfirmSuccess,
              })
            }>
            확인
          </S.StyledButton>
        </S.ButtonContainer>
      )}
      <InputGroup
        inputs={[
          {
            name: 'password',
            placeholder: '비밀번호',
            type: 'password',
            rules: passwordSignupRule,
          },
          {
            name: 'passwordConfirm',
            placeholder: '비밀번호 확인',
            type: 'password',
            rules: passwordConfirmRule(getValues),
          },
        ]}
        register={register}
        errors={{
          password: errors.password,
          passwordConfirm: errors.passwordConfirm,
        }}
      />
      <InputGroup
        inputs={[
          {
            name: 'nickname',
            placeholder: '별명',
            rules: nicknameRule,
          },
        ]}
        register={register}
        errors={{
          nickname: errors.nickname,
        }}
      />
      <SelectAreaSection
        purpose='SIGN_UP'
        onSuccess={handleAreaVerified}
        onChange={handleAreaChange}
      />
      <AgreementSection
        agreements={agreements}
        isCheckedAll={isCheckedAll}
        handleToggle={handleToggle}
        handleToggleAll={handleToggleAll}
      />
      <Button
        text='회원가입'
        variant={isDisabled ? 'disabled' : 'primary'}
        onClick={handleClickSignUp}
      />
    </S.Container>
  );
};

export default SignUpForm;
