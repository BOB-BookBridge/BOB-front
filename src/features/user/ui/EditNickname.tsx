import { useForm, useWatch } from 'react-hook-form';
import { useMyInfoMutation } from '@/entities/user';
import { nicknameRule } from '@/shared/constants';
import { Button, InputGroup } from '@/shared/ui';
import * as S from './Profile.styles';

interface EditNicknameValues {
  nickname: string;
}

interface EditNicknameProps {
  defaultNickname: string;
}
const EditNickname = ({ defaultNickname }: EditNicknameProps) => {
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
  const disabled = !nickname || errors.nickname || nickname === defaultNickname;

  const { mutate: changeNickname } = useMyInfoMutation();
  function handleEditNickname() {
    changeNickname(nickname);
  }
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
        errors={errors}
      />
      <S.ButtonWrapper>
        <Button
          text='수정'
          variant={disabled ? 'disabled' : 'primary'}
          onClick={handleEditNickname}
        />
      </S.ButtonWrapper>
    </S.NicknameSection>
  );
};

export default EditNickname;
