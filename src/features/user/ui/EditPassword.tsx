import { useForm, useWatch } from 'react-hook-form';
import * as S from './EditProfile.styles';
import { Button, InputGroup } from '@/shared/ui';
import { passwordConfirmRule, passwordSignupRule } from '@/shared/constants';
import { useState } from 'react';

interface EditPasswordValues {
  nowPwd: string;
  password: string;
  passwordConfirm: string;
}
const EditPassword = () => {
  const {
    register,
    control,
    getValues,
    reset,
    formState: { errors },
  } = useForm<EditPasswordValues>({
    mode: 'onChange',
  });

  const nowPwd = useWatch({ name: 'nowPwd', control });
  const password = useWatch({ name: 'password', control });
  const passwordConfirm = useWatch({ name: 'passwordConfirm', control });
  const disabled =
    !nowPwd || !password || !passwordConfirm || Object.keys(errors).length > 0;

  const [isOpen, setIsOpen] = useState(false);
  function handleClickEditPwd() {
    setIsOpen((prev) => !prev);
  }

  function handleCancelEdit() {
    reset();
    setIsOpen(false);
  }
  function handleEditPassword() {}

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ width: 150 }}>
        <Button
          text='비밀번호 재설정'
          onClick={handleClickEditPwd}
          variant='secondary'
        />
      </div>
      {isOpen && (
        <div
          style={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            maxWidth: 450,
          }}>
          <InputGroup
            inputs={[
              {
                name: 'nowPwd',
                placeholder: '현재 비밀번호',
                type: 'password',
              },
            ]}
            register={register}
            errors={{ nowPwd: errors.nowPwd }}
          />
          <InputGroup
            inputs={[
              {
                name: 'password',
                placeholder: '새 비밀번호',
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
            errors={errors}
          />
          <div
            style={{
              display: 'flex',
              width: '100%',
              maxWidth: 450,
              justifyContent: 'end',
            }}>
            <S.ButtonWrapper>
              <Button text='취소' variant='cancel' onClick={handleCancelEdit} />
            </S.ButtonWrapper>
            <S.ButtonWrapper>
              <Button
                text='저장'
                variant={disabled ? 'disabled' : 'primary'}
                onClick={handleEditPassword}
              />
            </S.ButtonWrapper>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPassword;
