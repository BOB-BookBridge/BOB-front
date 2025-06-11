import { useForm, useWatch } from 'react-hook-form';
import * as S from './EditProfile.styles';
import { Button, InputGroup } from '@/shared/ui';
import { nicknameRule } from '@/shared/constants';
interface EditNicknameValues {
  nickname: string;
}
const EditNickname = () => {
  const defaultNickname = '지지';
  const {
    register,
    control,
    formState: { errors },
  } = useForm<EditNicknameValues>({
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
    <S.NicknameSection>
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
      <S.ButtonWrapper>
        <Button
          text='수정'
          variant={nicknameDisabled ? 'disabled' : 'primary'}
          onClick={handleEditNickname}
        />
      </S.ButtonWrapper>
    </S.NicknameSection>
  );
};

export default EditNickname;
