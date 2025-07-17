import { useTheme } from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { compareDate, formatDate, formatTime } from '@/shared/lib';
import { AddIcon, SendIcon } from '@/shared/assets/icons';
import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomInfo from './ChatRoomInfo';
import * as S from './ChatRoom.styles';
import ChatImages from './ChatImages';
import { Div } from './ChatWidget';
const chats = {
  messages: [
    {
      id: 85,
      type: 'IMAGE',
      content: null,
      images: [
        {
          sequence: 0,
          fileName:
            'https://i.namu.wiki/i/d1A_wD4kuLHmOOFqJdVlOXVt1TWA9NfNt_HA0CS0Y_N0zayUAX8olMuv7odG2FiDLDQZIRBqbPQwBSArXfEJlQ.webp',
        },
        {
          sequence: 1,
          fileName:
            'https://mblogthumb-phinf.pstatic.net/MjAyMjA4MTBfMTg0/MDAxNjYwMTMyNTMzMjIx.txtlu-ga_7shsZhURoPuzfBeynckAa6ZuO_-o8rVbyUg.SobnP3coSZE-dKunc14ixPkeNmNi9LaDDOBblXnlGe0g.JPEG.happppy_/Screenshot%EF%BC%BF20220809%EF%BC%8D215510%EF%BC%BFInstagram.jpg?type=w800',
        },
        {
          sequence: 2,
          fileName:
            'https://cdn.metavv.com/prod/uploads/thumbnail/images/10043263/167100535142741_md.png',
        },
        {
          sequence: 3,
          fileName:
            'https://i.namu.wiki/i/qI0H3qHP6SMune3aF0Fmmu7j3q2a0kj613ndeUyB1aANfPy2I-J3bHNnMxIYCedb7YZXht0v4e6EFEjxIjTg5g.webp',
        },
        {
          sequence: 4,
          fileName:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTywyeS_VSiGo_DOI5jOAZHGoLPGNvTQYhTKA&s',
        },
      ],
      sentAt: '2025-07-14T14:16:01.05171',
      isRead: true,
      isMine: false,
    },
    {
      id: 8,
      type: 'IMAGE',
      content: null,
      images: [
        {
          sequence: 0,
          fileName:
            'https://i.namu.wiki/i/d1A_wD4kuLHmOOFqJdVlOXVt1TWA9NfNt_HA0CS0Y_N0zayUAX8olMuv7odG2FiDLDQZIRBqbPQwBSArXfEJlQ.webp',
        },
        {
          sequence: 1,
          fileName:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTywyeS_VSiGo_DOI5jOAZHGoLPGNvTQYhTKA&s',
        },
      ],
      sentAt: '2025-07-14T14:16:01.05171',
      isRead: true,
      isMine: false,
    },
    {
      id: 10,
      type: 'IMAGE',
      content: null,
      images: [
        {
          sequence: 0,
          fileName:
            'https://i.namu.wiki/i/d1A_wD4kuLHmOOFqJdVlOXVt1TWA9NfNt_HA0CS0Y_N0zayUAX8olMuv7odG2FiDLDQZIRBqbPQwBSArXfEJlQ.webp',
        },
      ],
      sentAt: '2025-07-14T14:16:01.05171',
      isRead: true,
      isMine: true,
    },
    {
      id: 11,
      type: 'MESSAGE',
      content: '답장',
      images: [],
      sentAt: '2025-07-15T10:48:40.414037',
      isRead: true,
      isMine: true,
    },
    {
      id: 9,
      type: 'MESSAGE',
      content: '메시지2 아니이게메세지가 길어지면 오른쪽으로 길어지지 않냐',
      images: [],
      sentAt: '2025-07-15T10:49:04.484982',
      isRead: true,
      isMine: false,
    },
    {
      id: 12,
      type: 'MESSAGE',
      content: '답장2',
      images: [],
      sentAt: '2025-07-15T10:52:40.414037',
      isRead: false,
      isMine: true,
    },
    {
      id: 13,
      type: 'MESSAGE',
      content: '답장3',
      images: [],
      sentAt: '2025-07-15T10:52:40.414037',
      isRead: false,
      isMine: true,
    },
  ],
  hasNext: false,
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
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  useEffect(() => {
    const behavior = hasMounted ? 'smooth' : 'auto';

    const timer = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior });
      setHasMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [chats.messages.length]);

  function handleCloseOverlay() {
    setIsOpenMenu(false);
    setIsOpenDropdown(false);
  }
  function handleEnterEvent(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSendMessage();
  }

  function handleSendMessage() {}
  function handleAddImages() {}

  return (
    <S.Container>
      {(isOpenMenu || isOpenDropdown) && (
        <S.Overlay onClick={handleCloseOverlay} />
      )}
      <ChatRoomHeader
        id={chatData.chatroomId}
        partner={chatData.partner}
        isOpenMenu={isOpenMenu}
        onClick={() => setIsOpenMenu(true)}
      />
      <Div />
      <ChatRoomInfo
        post={chatData.post}
        isOpenDropdown={isOpenDropdown}
        onClick={() => setIsOpenDropdown(true)}
      />
      <Div />
      <S.Chats>
        {chats.messages.map((chat, idx) => {
          const isLast = idx === chats.messages.length - 1;
          const prev = idx > 0 ? chats.messages[idx - 1].sentAt : null;
          const isNewDate = !prev || compareDate(chat.sentAt, prev);

          return (
            <React.Fragment key={chat.id}>
              {isNewDate && (
                <S.NoticeWrapper>
                  <S.DateText>{formatDate(chat.sentAt)}</S.DateText>
                </S.NoticeWrapper>
              )}
              {chat.isMine ? (
                <S.SendChatWrapper>
                  <S.MessageInfo>
                    {!chat.isRead && <S.UnreadText>1</S.UnreadText>}
                    <S.TimeText>{formatTime(chat.sentAt)}</S.TimeText>
                  </S.MessageInfo>
                  {chat.type === 'IMAGE' ? (
                    <ChatImages images={chat.images} />
                  ) : (
                    <S.SendChat>{chat.content}</S.SendChat>
                  )}
                </S.SendChatWrapper>
              ) : (
                <S.ReceiveChatWrapper>
                  {chat.type === 'IMAGE' ? (
                    <ChatImages images={chat.images} />
                  ) : (
                    <S.ReceiveChat>{chat.content}</S.ReceiveChat>
                  )}
                  <S.TimeText>{formatTime(chat.sentAt)}</S.TimeText>
                </S.ReceiveChatWrapper>
              )}
              {isLast && <div ref={bottomRef} />}
            </React.Fragment>
          );
        })}
      </S.Chats>
      <S.InputSection>
        <AddIcon
          stroke={theme.colors.GRAY_500}
          strokeWidth={4}
          strokeLinecap='round'
          style={{ cursor: 'pointer' }}
          onClick={handleAddImages}
        />
        <S.InputWrapper>
          <S.Input onKeyDown={handleEnterEvent} />
          <SendIcon
            fill={theme.colors.PRIMARY}
            style={{ cursor: 'pointer' }}
            onClick={handleSendMessage}
          />
        </S.InputWrapper>
      </S.InputSection>
    </S.Container>
  );
};

export default ChatRoom;
