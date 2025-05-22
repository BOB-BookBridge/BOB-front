import { useForm, useWatch } from 'react-hook-form';
import * as S from './SignUpForm.styles';
import { codeBasicRule, emailRule } from '@/shared/constants';
import { InputGroup } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { InputItem } from '@/shared/ui/InputGroup';
import {
  handleCodeRequest,
  handleEmailConfirm,
  startCountdown,
} from '../model';
import SignUpVerifyButton from './SignUpVerifyButton';

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
    <div style={{ width: '100%', maxWidth: 300 }}>
      <InputGroup inputs={inputs()} register={register} errors={errors} />
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
    </div>
  );
};

export default SignUpForm;
