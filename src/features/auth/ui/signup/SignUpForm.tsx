import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Button, InputGroup, SelectAreaSection } from '@/shared/ui';
import { useEmailVerify } from '../../model/useEmailVerify';
import { useAreaVerify } from '../../model/useAreaVerify';
import { useAgreement } from '../../model/useAgreement';
import SignUpVerifyButton from './SignUpVerifyButton';
import { InputItem } from '@/shared/ui/InputGroup';
import AgreementSection from './AgreementSection';
import * as S from './SignUpForm.styles';
import {
  useCodeVerifyMutation,
  useEmailVerifyMutation,
  useSignupMutation,
} from '@/entities/auth/queries';
import {
  codeBasicRule,
  emailRule,
  passwordConfirmRule,
  passwordSignupRule,
  nicknameRule,
} from '@/shared/constants';

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

  const { emdId, isVerifiedArea, handleAreaChange, handleAreaVerify } =
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

  const { mutate: signup } = useSignupMutation();
  const { mutate: emailVerify } = useEmailVerifyMutation();
  const { mutate: codeVerify } = useCodeVerifyMutation();

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
            onClick={handleEmailVerify}
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

  function handleEmailVerify() {
    emailVerify(
      {
        email,
      },
      { onSuccess: () => onCodeRequestSuccess() },
    );
  }

  function handleCodeVerify() {
    codeVerify(
      {
        email,
        code,
      },
      { onSuccess: () => onEmailConfirmSuccess() },
    );
  }
  function handleClickSignUp() {
    if (isDisabled) return;
    signup({ nickname, email, password, emdId });
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
          <S.StyledButton type='TRANSPARENT' onClick={handleEmailVerify}>
            재요청
          </S.StyledButton>
          <S.StyledButton type='CONFIRM' onClick={handleCodeVerify}>
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
      <SelectAreaSection onChange={handleAreaChange} />
      <Button
        text={isVerifiedArea ? '인증 완료' : '위치 인증'}
        onClick={() => handleAreaVerify()}
        variant={isVerifiedArea ? 'disabled' : 'primary'}
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
