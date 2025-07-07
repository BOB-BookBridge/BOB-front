import Image from 'next/image';
import { useMemo } from 'react';
import styled from 'styled-components';
import DefaultProfile from '@/shared/assets/default-profile.svg';
import { ListingList } from '@/features/listing/ui';
import { useMediaQuery } from '@/shared/model';
import { useUserQuery } from '@/entities/user';
import { getAreaNameById } from '../lib';

const UserProfile = ({ id }: { id: string }) => {
  const isMobile = useMediaQuery(`(max-width: 393px)`);
  const profileWidth = useMemo(() => (isMobile ? 50 : 80), [isMobile]);
  const { data, isPending, isError } = useUserQuery(id);

  return (
    <Container>
      {data && (
        <>
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
        </>
      )}
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
