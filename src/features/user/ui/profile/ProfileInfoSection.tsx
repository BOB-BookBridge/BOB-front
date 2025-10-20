import DefaultProfile from '@/shared/assets/default-profile.svg';
import { UserProfileProps } from '@/entities/user';
import EditNickname from '../EditNickname';
import EditArea from '../EditArea';
import * as S from '../Profile.styles';
import styled from 'styled-components';

type ProfileInfoProps = Pick<
  UserProfileProps,
  'nickname' | 'area' | 'profileImageUrl'
>;

const ProfileInfoSection = ({
  nickname,
  area,
  profileImageUrl,
}: ProfileInfoProps) => {
  return (
    <S.RowSectionContainer>
      {profileImageUrl === null && (
        <DefaultProfile width={80} height={80} style={{ flexShrink: 0 }} />
      )}
      <RightSection>
        <EditNickname defaultNickname={nickname} />
        <EditArea area={area} />
      </RightSection>
    </S.RowSectionContainer>
  );
};

export default ProfileInfoSection;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
`;
