import DefaultProfile from '@/shared/assets/default-profile.svg';
import { nicknameRule } from '@/shared/constants';
import { Button, InputGroup } from '@/shared/ui';
import { useForm, useWatch } from 'react-hook-form';
import styled from 'styled-components';

interface EditProfileValues {
  nickname: string;
  password: string;
  newPassword: string;
  passwordConfirm: string;
}
const EditProfile = () => {
  // #todo: 기본값 처리
  const defaultNickname = '지지';
  const {
    register,
    control,
    formState: { errors },
  } = useForm<EditProfileValues>({
    defaultValues: {
      nickname: defaultNickname,
    },
    mode: 'onChange',
  });

  const nickname = useWatch({ name: 'nickname', control });
  const nicknameDisabled =
    !nickname || errors.nickname || nickname === defaultNickname;
  function handleEditNickname() {}
  return (
    <div style={{ width: '100%', marginTop: 50 }}>
      <DefaultProfile width={100} />
      <NicknameSection>
        <InputGroup
          inputs={[
            {
              name: 'nickname',
              placeholder: '별명',
              type: 'text',
              rules: nicknameRule,
            },
          ]}
          register={register}
          errors={{ nickname: errors.nickname }}
        />
        <ButtonWrapper>
          <Button
            text='수정'
            variant={nicknameDisabled ? 'disabled' : 'primary'}
            onClick={handleEditNickname}
          />
        </ButtonWrapper>
      </NicknameSection>
    </div>
  );
};

export default EditProfile;

const NicknameSection = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: start;
`;

const ButtonWrapper = styled.div`
  width: 100px;
`;
