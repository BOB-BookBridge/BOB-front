import styled from 'styled-components';
import DefaultProfile from '@/shared/assets/default-profile.svg';
import { UserProfileReq } from '@/entities/user';
import EditNickname from './EditNickname';
import * as S from '../Profile.styles';
import Interests from './Interests';
import EditArea from './EditArea';

type ProfileInfoProps = Pick<
  UserProfileReq,
  'nickname' | 'area' | 'profileImageUrl' | 'interests'
>;

const ProfileInfoSection = ({
  nickname,
  area,
  profileImageUrl,
  interests,
}: ProfileInfoProps) => {
  return (
    <S.PriofileSectionContainer>
      {profileImageUrl === null && (
        <DefaultProfile width={80} height={80} style={{ flexShrink: 0 }} />
      )}
      <RightSection>
        <EditNickname defaultNickname={nickname} />
        <EditArea area={area} />
        <Interests interests={interests} />
      </RightSection>
    </S.PriofileSectionContainer>
  );
};

export default ProfileInfoSection;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
