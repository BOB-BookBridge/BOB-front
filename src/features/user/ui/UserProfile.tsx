import Image from 'next/image';
import { useMemo } from 'react';
import styled from 'styled-components';
import DefaultProfile from '@/shared/assets/default-profile.svg';
import { Interest, InterestsWrapper } from './profile/Interests';
import { ListingList } from '@/features/listing/ui';
import { LocalErrorBoundary } from '@/shared/lib';
import { useMediaQuery } from '@/shared/model';
import { useUserQuery } from '@/entities/user';
import BookItem from './profile/BookItem';
import { getAreaNameById } from '../lib';
import {
  LoadingContainer,
  LoadingIndicator,
} from '@/shared/ui/LoadingIndicator';

const UserProfile = ({ id }: { id: string }) => {
  const isMobile = useMediaQuery(`(max-width: 393px)`);
  const profileWidth = useMemo(() => (isMobile ? 50 : 80), [isMobile]);
  const { data, isPending } = useUserQuery(id);
  const filteredBookcase = data?.bookcase.filter((book) => book.available);

  return (
    <Container>
      {isPending ? (
        <LoadingContainer>
          <LoadingIndicator />
        </LoadingContainer>
      ) : (
        data && (
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
            <section>
              <SectionTitle>관심사</SectionTitle>
              <InterestsWrapper>
                {data.interests.length > 0 ? (
                  data.interests.map((interest, idx) => (
                    <Interest key={idx}>{interest}</Interest>
                  ))
                ) : (
                  <AreaText>등록된 관심사가 없습니다.</AreaText>
                )}
              </InterestsWrapper>
            </section>
            <section>
              <SectionTitle>책장</SectionTitle>
              <BookListWrapper>
                {filteredBookcase && filteredBookcase.length > 0 ? (
                  filteredBookcase.map((book) => (
                    <BookItem key={book.id} book={book} editMode={false} />
                  ))
                ) : (
                  <AreaText>등록된 도서가 없습니다.</AreaText>
                )}
              </BookListWrapper>
            </section>
            <section>
              <SectionTitle>희망 도서</SectionTitle>
              <BookListWrapper>
                {data.wishes && data.wishes.length > 0 ? (
                  data.wishes.map((book) => (
                    <BookItem key={book.id} book={book} editMode={false} />
                  ))
                ) : (
                  <AreaText>등록된 도서가 없습니다.</AreaText>
                )}
              </BookListWrapper>
            </section>
            <section>
              <SectionTitle>판매글</SectionTitle>
              <LocalErrorBoundary>
                <ListingList isUserPage={true} id={id} />
              </LocalErrorBoundary>
            </section>
          </>
        )
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
  gap: 20px;
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
  font-weight: 600;
`;

const SectionTitle = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
  }
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const AreaText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;

const BookListWrapper = styled.div`
  overflow-x: scroll;
  width: 100%;
  display: flex;
  gap: 10px;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => `${theme.colors.GRAY_300}`};
    border-radius: 5px;
    border-right: 1px solid transparent;
    background-clip: padding-box;
    box-sizing: border-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => `${theme.colors.GRAY_500}`};
  }
`;

export default UserProfile;
