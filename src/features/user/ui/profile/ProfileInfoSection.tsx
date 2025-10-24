import styled from 'styled-components';
import { AddHeartIcon, CloseIconXs } from '@/shared/assets/icons';
import DefaultProfile from '@/shared/assets/default-profile.svg';
import { UserProfileProps } from '@/entities/user';
import EditNickname from './EditNickname';
import * as S from '../Profile.styles';
import EditArea from './EditArea';

type ProfileInfoProps = Pick<
  UserProfileProps,
  'nickname' | 'area' | 'profileImageUrl' | 'interests'
>;

const ProfileInfoSection = ({
  nickname,
  area,
  profileImageUrl,
  interests,
}: ProfileInfoProps) => {
  const mockInterests = ['잠', '김 영한', '소설', 'abc', 'dsfsd', 'sadfafd'];
  return (
    <S.PriofileSectionContainer>
      {profileImageUrl === null && (
        <DefaultProfile width={80} height={80} style={{ flexShrink: 0 }} />
      )}
      <RightSection>
        <EditNickname defaultNickname={nickname} />
        <EditArea area={area} />
        <InterestsWrapper>
          {mockInterests.map((interest) => (
            <div key={interest} style={{ position: 'relative' }}>
              <Interest>{interest}</Interest>
              <CloseButtonWrapper>
                <CloseButton>
                  <CloseIconXs />
                </CloseButton>
              </CloseButtonWrapper>
            </div>
          ))}
          <AddInterestButton>
            <AddHeartIcon strokeWidth={2} />
            관심사 등록
          </AddInterestButton>
        </InterestsWrapper>
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

const InterestsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

const BaseInterest = styled.div`
  height: 40px;
  padding: 0 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 12px;
  }
`;

const Interest = styled(BaseInterest)`
  background-color: ${({ theme }) => theme.colors.BLACK};
  color: ${({ theme }) => theme.colors.WHITE};
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: -12px;
  right: -12px;
  padding: 8px;
  cursor: pointer;
`;

const CloseButton = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px ${({ theme }) => theme.colors.GRAY_500} solid;
  border-radius: 50%;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.colors.GRAY_700};
  }
`;

const AddInterestButton = styled(BaseInterest)`
  cursor: pointer;
  gap: 4px;
  border: 1px ${({ theme }) => theme.colors.GRAY_400} solid;
  color: ${({ theme }) => theme.colors.GRAY_800};

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_200};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.GRAY_300};
  }
  svg {
    stroke: currentColor;
  }
`;
