import Image from 'next/image';
import DefaultProfile from '@/shared/assets/default-profile.svg';
import { getAreaNameById } from '../lib';
import { ListingList } from '@/features/listing/ui';
import styled, { useTheme } from 'styled-components';
import { useMediaQuery } from '@/shared/model';
import { useMemo } from 'react';

const data = {
  memberId: '018e0df5-b7ec-7f36-b67f-80f3e4f49895',
  nickname: 'leehs',
  profileImageUrl: null,
  area: {
    emdId: 1,
    isAuthentication: true,
    authenticatedAt: '2025-05-20T12:00:00',
  },
};
const UserProfile = ({ id }: { id: string }) => {
  const isMobile = useMediaQuery(`(max-width: 393px)`);
  const profileWidth = useMemo(() => (isMobile ? 50 : 80), [isMobile]);
  return (
    <Container>
      <Profile>
        {data.profileImageUrl ? (
          <Image
            src={data.profileImageUrl}
            width={profileWidth}
            height={profileWidth}
            alt='프로필'
          />
        ) : (
          <DefaultProfile width={profileWidth} />
        )}
        <div>
          <BoldText>{data.nickname}</BoldText>
          <AreaText>{getAreaNameById(data.area.emdId)}</AreaText>
        </div>
      </Profile>
      <BoldText>[{data.nickname}]의 판매글</BoldText>
      <ListingList isUserPage={true} id={id} />
    </Container>
  );
};
const Container = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 40px;
  }
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Profile = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 10px;
  }
`;

const BoldText = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
  }
  font-size: 20px;
  font-weight: 500;
`;

const AreaText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;

export default UserProfile;
