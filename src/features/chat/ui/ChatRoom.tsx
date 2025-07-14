import React from 'react';
import Image from 'next/image';
import { useTheme } from 'styled-components';
import {
  ArrowBackIcon,
  ChatMeatballsIcon,
  DropdownIcon,
} from '@/shared/assets/icons';
import {
  chatPostStatusMap,
  compareDate,
  formatDate,
  formatTime,
} from '@/shared/lib';
import { useMyQuery } from '@/entities/user';
import * as S from './ChatRoom.styles';
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
} as const;

const ChatRoom = () => {
  const theme = useTheme();
  const { data } = useMyQuery();
  const isSeller = data.memberId === chatData.post.sellerId;

  const handleClickStatus = () => {
    console.log('click');
  };

  return (
    <S.Container>
      <S.Header>
        <S.IconWrapper>
          <ArrowBackIcon stroke={theme.colors.BLACK} strokeWidth={2} />
        </S.IconWrapper>
        <S.Nickname>{chatData.partner.nickname}</S.Nickname>
        <S.IconWrapper>
          <ChatMeatballsIcon stroke={theme.colors.BLACK} strokeWidth={2} />
        </S.IconWrapper>
      </S.Header>
      <Div />
      <S.Info>
        <S.ImageWrapper>
          <Image
            loader={() => chatData.post.thumbnailUrl}
            src={chatData.post.thumbnailUrl}
            alt='책 대표사진'
            width={40}
            height={40}
            unoptimized
          />
        </S.ImageWrapper>
        <div>
          <S.InfoTop>
            <S.Status
              onClick={isSeller ? handleClickStatus : undefined}
              $clickable={isSeller}>
              <S.StatusText>
                {chatPostStatusMap[chatData.post.status]}
              </S.StatusText>
              {isSeller && <DropdownIcon fill={theme.colors.BLACK} />}
            </S.Status>
            <S.TitleText>{chatData.post.title}</S.TitleText>
          </S.InfoTop>
          <S.InfoBottom>
            {chatData.post.sellPrice.toLocaleString()}원
          </S.InfoBottom>
        </div>
      </S.Info>
      <Div />
      <S.Chats>
        {chats.result.map((chat, idx) => {
          const prev = idx > 0 ? chats.result[idx - 1].sentAt : null;
          const isNewDate = !prev || compareDate(chat.sentAt, prev);

          return (
            <React.Fragment key={chat.messageId}>
              {isNewDate && (
                <S.NoticeWrapper>
                  <S.DateText>{formatDate(chat.sentAt)}</S.DateText>
                </S.NoticeWrapper>
              )}
              {chat.senderId === data.memberId ? (
                <S.SendChatWrapper>
                  <S.TimeText>{formatTime(chat.sentAt)}</S.TimeText>
                  <S.SendChat>{chat.content}</S.SendChat>
                </S.SendChatWrapper>
              ) : (
                <S.ReceiveChatWrapper>
                  <S.ReceiveChat>{chat.content}</S.ReceiveChat>
                  <S.TimeText>{formatTime(chat.sentAt)}</S.TimeText>
                </S.ReceiveChatWrapper>
              )}
            </React.Fragment>
          );
        })}
      </S.Chats>
      <S.Input />
    </S.Container>
  );
};

export default ChatRoom;
