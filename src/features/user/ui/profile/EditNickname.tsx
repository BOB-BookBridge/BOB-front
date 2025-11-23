import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { EditNicknameValues } from './ProfileInfoSection';
import { nicknameRule } from '@/shared/constants';
import { InputGroup } from '@/shared/ui';
import * as S from '../Profile.styles';

interface EditNicknameProps {
  register: UseFormRegister<EditNicknameValues>;
  errors: FieldErrors<EditNicknameValues>;
  editMode: boolean;
}
const EditNickname = ({ register, errors, editMode }: EditNicknameProps) => {
  return (
    <S.NicknameSection>
      <InputGroup
        inputs={[
          {
            name: 'nickname',
            placeholder: '별명',
            type: 'text',
            rules: nicknameRule,
            disabled: !editMode,
          },
        ]}
        register={register}
        errors={errors}
      />
    </S.NicknameSection>
  );
};

export default EditNickname;
