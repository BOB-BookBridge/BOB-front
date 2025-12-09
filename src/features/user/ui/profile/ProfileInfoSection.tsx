import { useState } from 'react';
import styled from 'styled-components';
import { useForm, useWatch } from 'react-hook-form';
import { useMyInfoMutation, UserProfileRes } from '@/entities/user';
import DefaultProfile from '@/shared/assets/default-profile.svg';
import { getCurrentPosition, showToast } from '@/shared/lib';
import EditNickname from './EditNickname';
import * as S from '../Profile.styles';
import { Button } from '@/shared/ui';
import Interests from './Interests';
import EditArea from './EditArea';

type ProfileInfoProps = Pick<
  UserProfileRes,
  'nickname' | 'area' | 'profileImageUrl' | 'interests'
>;

export interface EditNicknameValues {
  nickname: string;
}

const ProfileInfoSection = ({
  nickname: defaultNickname,
  area: defaultArea,
  profileImageUrl: defaultProfileImageUrl,
  interests: defaultInterests,
}: ProfileInfoProps) => {
  const [editMode, setEditMode] = useState(false);
  const {
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<EditNicknameValues>({
    defaultValues: {
      nickname: defaultNickname,
    },
    mode: 'onChange',
  });
  const nickname = useWatch({ name: 'nickname', control });
  const [emdId, setEmdId] = useState<number | undefined>(defaultArea.emdId);
  const [interests, setInterests] = useState<string[]>(defaultInterests);
  const { mutate: changeMyInfoMutation } = useMyInfoMutation();

  const normalize = (str: string) => str.trim().toLowerCase();

  function addInterest(value: string) {
    if (interests.length === 20) {
      showToast.error('관심사는 최대 20개까지 등록할 수 있습니다.');
      return false;
    }
    if (interests.some((item) => normalize(item) === normalize(value))) {
      showToast.error('이미 존재하는 관심사입니다.');
      return false;
    } else {
      setInterests((prev) => [...prev, value]);
      return true;
    }
  }

  function removeInterest(value: string) {
    setInterests((prev) => prev.filter((item) => item !== value));
  }

  function handleEnterEditMode() {
    setEditMode(true);
  }

  function handleResetAll() {
    reset();
    setEditMode(false);
    setEmdId(defaultArea.emdId);
    setInterests(defaultInterests);
  }

  async function handleRecertification() {
    if (!emdId || defaultArea.emdId !== emdId) return;
    updateLocation();
  }

  async function handleSaveEdit() {
    const interestSet = new Set(interests);
    const isSameInterest =
      defaultInterests.length === interests.length &&
      defaultInterests.every((i) => interestSet.has(i));

    const isSameArea = defaultArea.emdId === emdId;

    if (nickname !== defaultNickname || !isSameArea || !isSameInterest) {
      if (isSameArea) {
        changeMyInfoMutation({
          nickname,
          emdId,
          areaAuthenticate: false,
          interests,
        });
      } else if (emdId) {
        updateLocation();
      }
    } else {
      showToast.info('변경 사항이 없습니다.');
    }
  }

  async function updateLocation() {
    const pos = await getCurrentPosition();
    if (!pos || !emdId) return;
    const { lat, lon } = pos;
    changeMyInfoMutation({
      nickname,
      emdId,
      areaAuthenticate: true,
      lat,
      lon,
      interests,
    });
  }

  return (
    <S.PriofileSectionContainer>
      {defaultProfileImageUrl === null && (
        <DefaultProfile width={80} height={80} style={{ flexShrink: 0 }} />
      )}
      <RightSection>
        <EditNickname register={register} errors={errors} editMode={editMode} />
        <EditArea
          {...defaultArea}
          editMode={editMode}
          onChange={setEmdId}
          onRecertification={handleRecertification}
        />
        <Interests
          interests={interests}
          editMode={editMode}
          handleEnterEditMode={handleEnterEditMode}
          addInterest={addInterest}
          removeInterest={removeInterest}
        />
        <ButtonSection $editMode={editMode}>
          {editMode ? (
            <>
              <Button text='취소' onClick={handleResetAll} variant='cancel' />
              <Button text='저장' onClick={handleSaveEdit} />
            </>
          ) : (
            <Button text='수정' onClick={handleEnterEditMode} />
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
