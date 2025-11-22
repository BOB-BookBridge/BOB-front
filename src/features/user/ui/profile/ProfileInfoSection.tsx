import { useState } from 'react';
import styled from 'styled-components';
import { useForm, useWatch } from 'react-hook-form';
import DefaultProfile from '@/shared/assets/default-profile.svg';
import { UserProfileReq } from '@/entities/user';
import EditNickname from './EditNickname';
import * as S from '../Profile.styles';
import { Button } from '@/shared/ui';
import Interests from './Interests';
import EditArea from './EditArea';

type ProfileInfoProps = Pick<
  UserProfileReq,
  'nickname' | 'area' | 'profileImageUrl' | 'interests'
>;

export interface EditNicknameValues {
  nickname: string;
}

const ProfileInfoSection = ({
  nickname,
  area,
  profileImageUrl,
  interests,
}: ProfileInfoProps) => {
  const [editMode, setEditMode] = useState(false);
  const {
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<EditNicknameValues>({
    defaultValues: {
      nickname: nickname,
    },
    mode: 'onChange',
  });
  const newNickname = useWatch({ name: 'nickname', control });

  function handleClickEditMode() {
    setEditMode(true);
  }

  function handleCancelEdit() {
    reset();
    setEditMode(false);
  }

  function handleSaveEdit() {
    // 여기서 닉네임, 관심사, 활동 지역 한꺼번에 변경 요청
    console.log(newNickname);
  }
  return (
    <S.PriofileSectionContainer>
      {profileImageUrl === null && (
        <DefaultProfile width={80} height={80} style={{ flexShrink: 0 }} />
      )}
      <RightSection>
        <EditNickname register={register} errors={errors} editMode={editMode} />
        <EditArea {...area} editMode={editMode} />
        <Interests interests={interests} />
        <ButtonSection $editMode={editMode}>
          {editMode ? (
            <>
              <Button text='취소' onClick={handleCancelEdit} variant='cancel' />
              <Button text='저장' onClick={handleSaveEdit} />
            </>
          ) : (
            <Button text='수정' onClick={handleClickEditMode} />
          )}
        </ButtonSection>
      </RightSection>
    </S.PriofileSectionContainer>
  );
};

export default ProfileInfoSection;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonSection = styled.div<{ $editMode: boolean }>`
  width: ${({ $editMode }) => ($editMode ? '25%' : '15%')};
  align-self: end;
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: ${({ $editMode }) => ($editMode ? '40%' : '30%')};
  }
`;
