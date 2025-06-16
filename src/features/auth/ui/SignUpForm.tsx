import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { useForm, useWatch } from 'react-hook-form';
import {
  codeBasicRule,
  emailRule,
  passwordConfirmRule,
  passwordSignupRule,
  nicknameRule,
} from '@/shared/constants';
import {
  handleCodeRequest,
  handleEmailConfirm,
  startCountdown,
} from '../model';
import { Button, CheckBox, InputGroup, SelectAreaSection } from '@/shared/ui';
import SignUpVerifyButton from './SignUpVerifyButton';
import { InputItem } from '@/shared/ui/InputGroup';
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
  const theme = useTheme();
  const router = useRouter();

  const email = useWatch({ name: 'email', control });
  const code = useWatch({ name: 'code', control });
  const password = useWatch({ name: 'password', control });
  const passwordConfirm = useWatch({ name: 'passwordConfirm', control });
  const nickname = useWatch({ name: 'nickname', control });
  const [emdId, setEmdId] = useState<number | undefined>();
  const [isVerifiedArea, setIsVerifiedArea] = useState(false);

  const sendCodeDisabled = !email || !!errors.email;
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [timeText, setTimeText] = useState('03:00');
  const [restartCountdown, setRestartCountdown] = useState(0);
  const [agreements, setAgreements] = useState({
    use: false,
    info: false,
  });

  const isCheckedAll = agreements.use && agreements.info;

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

  useEffect(() => {
    if (!showCodeInput || isVerifiedEmail) return;

    const interval = startCountdown({
      onTick: setTimeText,
      shouldStop: () => isVerifiedEmail,
    });

    return () => clearInterval(interval);
  }, [showCodeInput, restartCountdown, isVerifiedEmail]);

  function handleAreaChange() {
    setEmdId(undefined);
    setIsVerifiedArea(false);
  }

  function handleAreaVerified(emdId: number) {
    setEmdId(emdId);
    setIsVerifiedArea(true);
  }

  const handleToggle = (key: 'use' | 'info') => {
    const newAgreements = { ...agreements, [key]: !agreements[key] };
    setAgreements(newAgreements);
  };

  const handleToggleAll = () => {
    const checked = !isCheckedAll;
    setAgreements({ use: checked, info: checked });
  };

  function onCodeRequestSuccess() {
    setShowCodeInput(true);
    setTimeText('03:00');
    setRestartCountdown((prev) => prev + 1);
  }

  function onEmailConfirmSuccess() {
    setIsVerifiedEmail(true);
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
        onSuccess={handleAreaVerified}
        onChange={handleAreaChange}
      />
      <div style={{ width: '100%', maxWidth: 300 }}>
        <S.Line />
        <CheckBox
          id='all'
          checked={isCheckedAll}
          onChange={handleToggleAll}
          label={
            <>
              <p
                style={{
                  fontSize: '16px',
                }}>
                전체 동의
              </p>
            </>
          }
        />
        <CheckBox
          id='use'
          checked={agreements.use}
          onChange={() => handleToggle('use')}
          label={
            <>
              <S.ImportText>[필수]</S.ImportText>
              <Link
                href='/signup/use'
                style={{
                  fontSize: '14px',
                  color: theme.colors.GRAY_500,
                }}>
                서비스 이용 약관
              </Link>
            </>
          }
        />
        <CheckBox
          id='info'
          checked={agreements.info}
          onChange={() => handleToggle('info')}
          label={
            <>
              <S.ImportText>[필수]</S.ImportText>
              <Link
                href='/signup/info'
                style={{
                  fontSize: '14px',
                  color: theme.colors.GRAY_500,
                }}>
                개인정보 수집 및 이용
              </Link>
            </>
          }
        />
      </div>
      <Button
        text='회원가입'
        variant={isDisabled ? 'disabled' : 'primary'}
        onClick={handleClickSignUp}
      />
    </S.Container>
  );
};

export default SignUpForm;
