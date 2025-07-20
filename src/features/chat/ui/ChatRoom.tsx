import { useParams } from 'next/navigation';
import { useTheme } from 'styled-components';
import React, { useEffect, useRef, useState } from 'react';
import { compareDate, formatDate, formatTime } from '@/shared/lib';
import {
  ChatMessage,
  connectChat,
  connectChatProps,
  useChatInfoQuery,
  useMessageMutate,
  useMessageQuery,
} from '@/entities/chat';
import { AddIcon, SendIcon, SendReverseIcon } from '@/shared/assets/icons';
import { useFABStore, useIsMobile } from '@/shared/model';
import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomInfo from './ChatRoomInfo';
import * as S from './ChatRoom.styles';
import ChatImages from './ChatImages';
import { Div } from './ChatWidget';
import { ImageFile, useUploadImagesMutation } from '@/entities/files';
import { DetailImage } from '@/entities/listing';

const ChatRoom = () => {
  const theme = useTheme();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const isMobile = useIsMobile();
  const chatId = useFABStore((s) => s.chatId);
  const params = useParams<{ id: string }>();
  const chatRoomId = isMobile && params ? Number(params.id) : chatId;
  const [message, setMessage] = useState('');
  const { data: chatData } = useMessageQuery(chatRoomId!, {
    enabled: chatRoomId !== null,
  });
  const { data: chatInfo } = useChatInfoQuery(chatRoomId!, {
    enabled: chatRoomId !== null,
  });
  const [images, setImages] = useState<DetailImage[]>([]);
  const [chats, setChats] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (chatData) {
      setChats(chatData.messages);
    }
  }, [chatData]);

  useEffect(() => {
    if (!chatRoomId) return;
    connectChat(chatRoomId, handleMessage, handleConnectError);
  }, []);

  function handleMessage(data: connectChatProps) {
    console.log(data.data);
    // chats.messages.push(data.data);
  }
  function handleConnectError(error: Event) {
    console.log(error);
  }
  useEffect(() => {
    console.log('length 변경');
    console.log(chats);
    const behavior = hasMounted ? 'smooth' : 'auto';

    const timer = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior });
      setHasMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [chats.length]);

  function handleCloseOverlay() {
    setIsOpenMenu(false);
    setIsOpenDropdown(false);
  }
  function handleInputMessage(value: string) {
    setMessage(value);
  }
  function handleEnterEvent(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false)
      handleSendMessage();
  }

  const { mutate: sendMessage } = useMessageMutate();

  function handleSendMessage({
    idx,
    images,
  }: {
    idx?: number;
    images?: DetailImage[];
  } = {}) {
    if (!chatRoomId) return;
    const nowIdx = idx ? idx : (chats.length ?? 0);
    const type = message.length !== 0 ? 'TEXT' : 'IMAGE';
    const fileNames = images && images.map(({ fileName }) => fileName);
    setChats((prev) => [
      ...prev,
      {
        type,
        content: type === 'TEXT' ? message : null,
        images: images ? images : [],
        isMine: true,
        isLoading: true,
      },
    ]);
    console.log('fileNAmes', fileNames);
    sendMessage(
      {
        message: type === 'TEXT' ? message : null,
        chatroomId: chatRoomId,
        fileNames: fileNames ? fileNames : [],
      },
      {
        onSuccess: (res) => {
          setChats((prev) => {
            const updated = [...prev];
            const target = updated[nowIdx];
            if (target) {
              updated[nowIdx] = {
                ...target,
                isLoading: false,
                isRead: res.isRead,
                sentAt: String(new Date()),
              };
            }
            return updated;
          });
        },
      },
    );
    setMessage('');
  }
  const { mutate: uploadImage } = useUploadImagesMutation();

  function handleSelectImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    if (files.length > 5) {
      alert('최대 5장까지 업로드 할 수 있어요');
      e.target.value = '';
      return;
    }
    const fileArray = Array.from(files);
    uploadImage(
      { domain: 'CHAT', images: fileArray },
      {
        onSuccess: (uploadedImages) => {
          console.log(uploadedImages);
          const sortedImages = uploadedImages.sort(
            (a, b) => a.sequence - b.sequence,
          );
          console.log('uploaded', sortedImages);
          handleSendMessage({ images: sortedImages });
        },
      },
    );
  }

  if (!chatInfo || !chats) return;
  return (
    <S.Container>
      {(isOpenMenu || isOpenDropdown) && (
        <S.Overlay onClick={handleCloseOverlay} />
      )}
      <ChatRoomHeader
        id={chatInfo.chatroomId}
        partner={chatInfo.partner}
        isOpenMenu={isOpenMenu}
        onClick={() => setIsOpenMenu(true)}
      />
      <Div />
      <ChatRoomInfo
        post={chatInfo.post}
        isOpenDropdown={isOpenDropdown}
        onClick={() => setIsOpenDropdown(true)}
      />
      <Div />
      <S.Chats>
        {chats.map((chat: ChatMessage, idx: number) => {
          const isLast = idx === chats.length - 1;
          const prev = idx > 0 ? chats[idx - 1].sentAt : null;
          const isNewDate = chat.sentAt
            ? !prev || compareDate(chat.sentAt, prev)
            : false;

          return (
            <React.Fragment key={idx}>
              {chat.sentAt && isNewDate && (
                <S.NoticeWrapper>
                  <S.DateText>{formatDate(chat.sentAt)}</S.DateText>
                </S.NoticeWrapper>
              )}
              {chat.type === 'SYSTEM' ? (
                <S.NoticeWrapper>
                  <S.SystemMessage>
                    <b>알림 </b>
                    {chat.content}
                  </S.SystemMessage>
                </S.NoticeWrapper>
              ) : chat.isMine ? (
                <S.SendChatWrapper>
                  <S.MessageInfo>
                    {!chat.isRead && <S.UnreadText>1</S.UnreadText>}
                    {chat.sentAt ? (
                      <S.TimeText>{formatTime(chat.sentAt)}</S.TimeText>
                    ) : (
                      <SendReverseIcon fill={theme.colors.GRAY_500} />
                    )}
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
                  {chat.sentAt && (
                    <S.TimeText>{formatTime(chat.sentAt)}</S.TimeText>
                  )}
                </S.ReceiveChatWrapper>
              )}
              {isLast && <div ref={bottomRef} />}
            </React.Fragment>
          );
        })}
      </S.Chats>
      <S.InputSection>
        <label style={{ cursor: 'pointer' }}>
          <AddIcon
            stroke={theme.colors.GRAY_500}
            strokeWidth={4}
            strokeLinecap='round'
          />
          <input
            onChange={handleSelectImages}
            type='file'
            multiple
            style={{ display: 'none' }}
          />
        </label>
        <S.InputWrapper>
          <S.Input
            onKeyDown={handleEnterEvent}
            value={message}
            onChange={(e) => handleInputMessage(e.target.value)}
          />
          <SendIcon
            fill={theme.colors.PRIMARY}
            style={{ cursor: 'pointer' }}
            onClick={() => handleSendMessage()}
          />
        </S.InputWrapper>
      </S.InputSection>
    </S.Container>
  );
};

export default ChatRoom;
