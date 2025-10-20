import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { passwordConfirmRule, passwordSignupRule } from '@/shared/constants';
import { usePasswordMutation } from '@/entities/user';
import { Button, InputGroup } from '@/shared/ui';
import * as S from '../Profile.styles';

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

  const { mutate: changePassword } = usePasswordMutation();
  function handleEditPassword() {
    changePassword(
      { oldPassword: nowPwd, newPassword: password },
      { onSuccess: handleCancelEdit },
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <S.AccountTitleText $isButton={true} onClick={handleClickEditPwd}>
        {`비밀번호 재설정 >`}
      </S.AccountTitleText>

      {isOpen && (
        <S.PasswordForm>
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
          <S.Actions>
            <S.ButtonWrapper>
              <Button
                text='취소'
                variant='cancel'
                onClick={handleCancelEdit}
                size='sm'
              />
            </S.ButtonWrapper>
            <S.ButtonWrapper>
              <Button
                text='저장'
                variant={disabled ? 'disabled' : 'primary'}
                size='sm'
                onClick={handleEditPassword}
              />
            </S.ButtonWrapper>
          </S.Actions>
        </S.PasswordForm>
      )}
    </div>
  );
};

export default EditPassword;
