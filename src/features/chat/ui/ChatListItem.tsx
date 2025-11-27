'use client';

import Image from 'next/image';
import styled from 'styled-components';
import DefaultProfile from '@/shared/assets/default-profile.svg';
import { convertDiffToString } from '@/shared/lib';
import { Chat } from '@/entities/chat/types';
import Badge from '@/shared/ui/Badge';

const ChatListItem = ({
  data,
  onClick,
}: {
  data: Chat;
  onClick: (e: number | null) => void;
}) => {
  return (
    <Container onClick={() => onClick(data.id)}>
      <LeftSection>
        <ImagesWrapper>
          <ProfileWrapper>
            {data.partner.profileImageUrl ? (
              <Image
                src={data.partner.profileImageUrl}
                width={35}
                height={35}
                alt='프로필'
              />
            ) : (
              <DefaultProfile width={35} />
            )}
          </ProfileWrapper>
          <BookThumbnailWrapper>
            <img
              src={data.thumbnailUrl}
              alt='책 표지'
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </BookThumbnailWrapper>
        </ImagesWrapper>
        <TitleAndMessage>
          <TitleText>
            {/* <span>{data.title}</span> */}
            <span>{data.partner.nickname}</span>
          </TitleText>
          <MessageText>{data.lastMessage}</MessageText>
        </TitleAndMessage>
      </LeftSection>
      <RightSection>
        <TimeText>{convertDiffToString(data.lastMessageAt)}</TimeText>
        {data.unreadCount > 0 && <Badge unReadCount={data.unreadCount} />}
      </RightSection>
    </Container>
  );
};

export default ChatListItem;

const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_300};
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  min-width: 0;
`;

const ImagesWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 50px;
`;

const ProfileWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
`;

const BookThumbnailWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 35px;
  height: 35px;
  border-radius: 8px;
  overflow: hidden;
  border: 2.5px solid ${({ theme }) => theme.colors.WHITE};
  z-index: 2;
`;

const TitleAndMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  min-width: 0;
  width: 100%;
`;

const TitleText = styled.span`
  font-weight: 500;
  font-size: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 14px;
  }
`;

const MessageText = styled.span`
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 12px;
  }
`;

const RightSection = styled.div`
  flex: 0.2;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 2px;
`;

const TimeText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_500};
`;
