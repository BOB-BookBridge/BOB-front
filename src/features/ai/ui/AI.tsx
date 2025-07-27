import { useTheme } from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { SendIcon } from '@/shared/assets/icons';
import {
  ReceiveChat,
  ReceiveChatWrapper,
  SendChat,
  SendChatWrapper,
} from '@/features/chat/ui/ChatRoom.styles';
import * as S from './AI.styles';

interface AIMessage {
  id?: string;
  content: string;
  sentAt?: string;
  isMine?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}
const AI = () => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [chats, setChats] = useState<AIMessage[]>([]);

  useEffect(() => {
    const behavior = 'smooth';

    const timer = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior });
    }, 0);

    return () => clearTimeout(timer);
  }, [chats.length]);

  function handleInputMessage(value: string) {
    setMessage(value);
  }

  function handleSendMessage() {
    if (message.length === 0) return;
    setChats((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        content: message,
        sentAt: String(new Date()),
        isMine: true,
        isLoading: true,
        isError: false,
      },
      {
        id: crypto.randomUUID(),
        content:
          '떠나는 길에 네가 내게 말했지 너는 바라는 게 너무나 많아 아냐, 내가 늘 바란 건 하나야 한 개뿐이야, 달디단, 밤양갱 달디달고, 달디달고, 달디단, 밤양갱, 밤양갱 내가 먹고 싶었던 건, 달디단, 밤양갱, 밤양갱이야 상다리가 부러지고 둘이서 먹다 하나가 쓰러져버려도 나라는 사람을 몰랐던 넌 떠나가다가 돌아서서 말했지 너는 바라는 게 너무나 많아 아냐, 내가 늘 바란 건 하나야 한 개뿐이야, 달디단, 밤양갱',
        sentAt: String(new Date()),
        isMine: false,
        isLoading: true,
        isError: false,
      },
    ]);
    setMessage('');
  }

  function handleEnterEvent(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false)
      handleSendMessage();
  }

  return (
    <S.Container>
      {chats.length === 0 ? (
        <S.Notice>
          <div style={{ fontSize: 24, fontWeight: 600 }}>
            책 속 길잡이, 당신만의 AI 북메이트
          </div>
          <div style={{ fontSize: 18 }}>
            북메이트에게 이렇게 말을 걸어보세요!
          </div>
          <SendChat>미움받을 용기라는 책 요약해줘</SendChat>
          <SendChat>슬럼프일 때 도움되는 책 추천해줘</SendChat>
          <div style={{ fontWeight: 600 }}>🚫 그 외 질문은 제한돼요</div>
          <div
            style={{ fontSize: 14, color: theme.colors.GRAY_500, margin: 20 }}>
            이 대화는 저장되지 않으니, 마음에 남는 문장은 따로 기록해 두는 걸
            추천해요!
          </div>
        </S.Notice>
      ) : (
        <S.ChatScrollWrapper>
          <S.Chats>
            {chats.map((chat, idx) => {
              const isLast = idx === chats.length - 1;
              return (
                <React.Fragment key={chat.id}>
                  {chat.isMine ? (
                    <SendChatWrapper>
                      <SendChat>{chat.content}</SendChat>
                    </SendChatWrapper>
                  ) : (
                    <ReceiveChatWrapper>
                      <ReceiveChat>{chat.content}</ReceiveChat>
                    </ReceiveChatWrapper>
                  )}
                  {isLast && <div ref={bottomRef} />}
                </React.Fragment>
              );
            })}
          </S.Chats>
        </S.ChatScrollWrapper>
      )}
      <S.InputWrapper $isActivate={chats.length > 0 ? true : false}>
        <S.Input
          onKeyDown={handleEnterEvent}
          value={message}
          onChange={(e) => handleInputMessage(e.target.value)}
          placeholder='북메이트에게 말 걸기'
        />
        <S.IconWrapper>
          <SendIcon
            fill={theme.colors.WHITE}
            style={{ cursor: 'pointer' }}
            onClick={() => handleSendMessage()}
          />
        </S.IconWrapper>
      </S.InputWrapper>
    </S.Container>
  );
};
export default AI;
