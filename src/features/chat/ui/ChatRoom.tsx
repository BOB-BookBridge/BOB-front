import React from 'react';
import Image from 'next/image';
import styled, { useTheme } from 'styled-components';
import {
  ArrowBackIcon,
  ChatMeatballsIcon,
  DropdownIcon,
} from '@/shared/assets/icons';
import { compareDate, formatDate, formatTime } from '@/shared/lib';
import { useMyQuery } from '@/entities/user';
import { Div } from './ChatWidget';
const chats = {
  result: [
    {
      messageId: 1001,
      senderId: '0197c5e3-5422-77d7-bf9f-81723f32f20a',
      content: '책 아직 거래 가능할까요?',
      sentAt: '2024-03-30T13:45:00',
    },
    {
      messageId: 1002,
      senderId: '0197c5e3-5422-77d7-bf9f-81723f32f20a',
      content: '책 아직 거래 가능할까요?',
      sentAt: '2024-03-30T13:45:00',
    },
    {
      messageId: 1003,
      senderId: '0197c5e3-5422-77d7-bf9f-81723f32f20a',
      content: '책 아직 거래 가능할까요?',
      sentAt: '2024-03-30T13:45:00',
    },
    {
      messageId: 1004,
      senderId: '0197c5e3-5422-77d7-bf9f-81723f32f20a',
      content: '책 아직 거래 가능할까요?',
      sentAt: '2024-03-30T13:45:00',
    },
    {
      messageId: 1005,
      senderId: '0197c5e3-5422-77d7-bf9f-81723f32f20a',
      content:
        '책 아직 거래 가능할까요? 두 줄이 되면 어떻게 디나오 어덯더ㅓㅇ더랜ㅇ렌',
      sentAt: '2024-03-30T13:45:00',
    },
    {
      messageId: 1006,
      senderId: '0197c5e3-5422-77d7-bf9f-81723f32f20b',
      content: '네 가능해요!',
      sentAt: '2024-03-31T13:46:00',
    },
  ],
};

const chatData = {
  chatroomId: 1,
  title:
    'manager - [Real MySQL 8.0 1권 - 개발자와 DBA를 위한 MySQL 실전 가이드]',
  trade: {
    id: 1,
    status: 'REQUESTED',
  },
  post: {
    id: 9,
    title: 'Real MySQL 8.0 1권 - 개발자와 DBA를 위한 MySQL 실전 가이드',
    thumbnailUrl:
      'https://image.aladin.co.kr/product/27848/87/cover500/k712734689_1.jpg',
    sellPrice: 24000,
    sellerId: '0197c5e3-5422-77d7-bf9f-81723f32f20b',
    status: 'IN_PROGRESS',
  },
  partner: {
    id: '0197ac49-d931-76ea-a6f0-30665229f9b0',
    nickname: 'manager',
    profileUrl: null,
  },
};

const ChatRoom = () => {
  const theme = useTheme();
  const { data } = useMyQuery();
  const isSeller = data.memberId === chatData.post.sellerId;

  const handleClickStatus = () => {
    console.log('click');
  };
  return (
    <Container>
      <Header>
        <IconWrapper>
          <ArrowBackIcon stroke={theme.colors.BLACK} strokeWidth={2} />
        </IconWrapper>
        <Nickname>{chatData.partner.nickname}</Nickname>
        <IconWrapper>
          <ChatMeatballsIcon stroke={theme.colors.BLACK} strokeWidth={2} />
        </IconWrapper>
      </Header>
      <Div />
      <Info>
        <ImageWrapper>
          <Image
            loader={() => chatData.post.thumbnailUrl}
            src={chatData.post.thumbnailUrl}
            alt='책 대표사진'
            width={40}
            height={40}
            unoptimized
          />
        </ImageWrapper>
        <div>
          <InfoTop>
            <Status
              onClick={isSeller ? handleClickStatus : undefined}
              $clickable={isSeller}>
              <StatusText>거래완료</StatusText>
              {isSeller && <DropdownIcon />}
            </Status>
            <TitleText>{chatData.post.title}</TitleText>
          </InfoTop>
          <InfoBottom>{chatData.post.sellPrice.toLocaleString()}원</InfoBottom>
        </div>
      </Info>
      <Div />
      <Chats>
        {chats.result.map((chat, idx) => {
          const prev = idx > 0 ? chats.result[idx - 1].sentAt : null;
          const isNewDate = !prev || compareDate(chat.sentAt, prev);

          return (
            <React.Fragment key={chat.messageId}>
              {isNewDate && (
                <NoticeWrapper>
                  <DateText>{formatDate(chat.sentAt)}</DateText>
                </NoticeWrapper>
              )}

              {chat.senderId === data.memberId ? (
                <SendChatWrapper>
                  <TimeText>{formatTime(chat.sentAt)}</TimeText>
                  <SendChat>{chat.content}</SendChat>
                </SendChatWrapper>
              ) : (
                <ReceiveChatWrapper>
                  <ReceiveChat>{chat.content}</ReceiveChat>
                  <TimeText>{formatTime(chat.sentAt)}</TimeText>
                </ReceiveChatWrapper>
              )}
            </React.Fragment>
          );
        })}
      </Chats>

      <Input></Input>
    </Container>
  );
};

export default ChatRoom;
const Container = styled.div`
  margin: 10px 0;
`;

const Header = styled.div`
  display: flex;
  margin: 0 10px;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

const Nickname = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  gap: 10px;
`;

const ImageWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
`;

const InfoTop = styled.div`
  display: flex;
`;

const InfoBottom = styled.div`
  font-size: 14px;
  font-weight: 600;
`;
const Status = styled.div<{ $clickable: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  ${({ $clickable }) => $clickable && 'cursor: pointer;'}
`;

const StatusText = styled.div`
  font-size: 14px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TitleText = styled.div`
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
`;

const Chats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
`;

const NoticeWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const DateText = styled.div`
  color: ${({ theme }) => theme.colors.GRAY_600};
  font-weight: 500;
  font-size: 11px;
  padding: 2px 12px;
  border-radius: 20px;
`;

const ReceiveChatWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: end;
  gap: 5px;
`;

const ReceiveChat = styled.div`
  background-color: ${({ theme }) => theme.colors.GRAY_300};
  color: ${({ theme }) => theme.colors.BLACK};
  padding: 8px 12px;
  border-radius: 16px 16px 16px 0;
  max-width: 60%;
`;

const SendChatWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;
  gap: 5px;
`;

const SendChat = styled.div`
  background-color: ${({ theme }) => theme.colors.SENDCHAT_BACK};
  color: ${({ theme }) => theme.colors.SENDCHAT_TEXT};
  padding: 8px 12px;
  border-radius: 16px 16px 0 16px;
  max-width: 60%;
`;

const TimeText = styled.div`
  color: ${({ theme }) => theme.colors.GRAY_600};
  font-size: 11px;
  margin-bottom: 5px;
`;

const Input = styled.div``;
