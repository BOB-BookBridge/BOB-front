import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  codeBasicRule,
  emailRule,
  passwordConfirmRule,
  passwordSignupRule,
  nicknameRule,
} from '@/shared/constants';
import { InputGroup } from '@/shared/ui';
import { InputItem } from '@/shared/ui/InputGroup';
import {
  handleCodeRequest,
  handleEmailConfirm,
  startCountdown,
} from '../model';
import SignUpVerifyButton from './SignUpVerifyButton';
import * as S from './SignUpForm.styles';

interface SignUpFormValues {
  email: string;
  verifyCode: string;
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
  const verifyCode = useWatch({ name: 'verifyCode', control });
  const password = useWatch({ name: 'password', control });
  const passwordConfirm = useWatch({ name: 'passwordConfirm', control });
  const nickname = useWatch({ name: 'nickname', control });

  const sendCodeDisabled = !email || !!errors.email;
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [timeText, setTimeText] = useState('03:00');
  const [restartCountdown, setRestartCountdown] = useState(0);

  useEffect(() => {
    if (!!errors.password) trigger('passwordConfirm');
  }, [password]);

  useEffect(() => {
    if (!showCodeInput || isVerifiedEmail) return;

    const interval = startCountdown({
      onTick: setTimeText,
      shouldStop: () => isVerifiedEmail,
    });

    return () => clearInterval(interval);
  }, [showCodeInput, restartCountdown, isVerifiedEmail]);

  function onEmailConfirmSuccess() {
    setIsVerifiedEmail(true);
  }

  function onCodeRequestSuccess() {
    setShowCodeInput(true);
    setTimeText('03:00');
    setRestartCountdown((prev) => prev + 1);
  }
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
        name: 'verifyCode',
        placeholder: '인증 코드',
        rules: codeBasicRule,
      });
    }

    return baseInputs;
  };

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
            type='RE-REQUEST'
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
                verifyCode,
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
    </S.Container>
  );
};

export default SignUpForm;
