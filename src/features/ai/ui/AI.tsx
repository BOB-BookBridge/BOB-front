import { useTheme } from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { ChatRole, sendChatToAI } from '@/entities/ai';
import { SendIcon } from '@/shared/assets/icons';
import { LoadingIndicator } from '@/shared/ui';
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
  role: ChatRole;
  sentAt?: string;
  isLoading?: boolean;
  isError?: boolean;
}
const AI = () => {
  const theme = useTheme();
  const [message, setMessage] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<AIMessage[]>([]);

  useEffect(() => {
    const behavior = 'smooth';

    const timer = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior });
    }, 0);

    return () => clearTimeout(timer);
  }, [messages.length]);

  function handleInputMessage(value: string) {
    setMessage(value);
  }

  function handleSendMessage() {
    if (message.length === 0) return;
    setMessages((prev) => {
      const updated = [
        ...prev,
        {
          id: crypto.randomUUID(),
          content: message,
          sentAt: String(new Date()),
          role: 'user' as const,
          isLoading: true,
          isError: false,
        },
      ];
      fetchAIResponse(updated);
      return updated;
    });
    setMessage('');
  }

  async function fetchAIResponse(updated: AIMessage[]) {
    try {
      const res = await sendChatToAI({
        messages: updated.map(({ role, content }) => ({ role, content })),
      });

      setMessages((prev) => [
        ...prev.map((m) =>
          m.role === 'user' && m.isLoading ? { ...m, isLoading: false } : m,
        ),
        {
          id: crypto.randomUUID(),
          content: res.reply,
          sentAt: new Date().toISOString(),
          role: 'assistant',
          isLoading: false,
          isError: res.error,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.map((m) =>
          m.role === 'user' && m.isLoading
            ? { ...m, isLoading: false, isError: true }
            : m,
        ),
        {
          id: crypto.randomUUID(),
          content: '네트워크 오류가 발생했어요. 다시 시도해주세요.',
          sentAt: new Date().toISOString(),
          role: 'assistant',
          isLoading: false,
          isError: true,
        },
      ]);
    }
  }

  function handleEnterEvent(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && e.nativeEvent.isComposing === false)
      handleSendMessage();
  }
  function splitMessage(text: string) {
    return text.replace(/\r\n/g, '\n').replace(/\\n/g, '\n').split('\n');
  }

  return (
    <S.Container>
      {messages.length === 0 ? (
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
            {messages.map((chat, idx) => {
              const isLast = idx === messages.length - 1;
              return (
                <React.Fragment key={chat.id}>
                  {chat.role === 'user' ? (
                    <SendChatWrapper>
                      <SendChat>
                        {splitMessage(chat.content).map((line, idx) => (
                          <React.Fragment key={idx}>
                            <span>{line}</span>
                            <br />
                          </React.Fragment>
                        ))}
                      </SendChat>
                    </SendChatWrapper>
                  ) : (
                    <ReceiveChatWrapper>
                      <ReceiveChat>
                        {splitMessage(chat.content).map((line, idx) => (
                          <React.Fragment key={idx}>
                            <span>{line}</span>
                            <br />
                          </React.Fragment>
                        ))}
                      </ReceiveChat>
                    </ReceiveChatWrapper>
                  )}
                  {chat.isLoading && (
                    <ReceiveChatWrapper>
                      <LoadingIndicator text='생각중...' />
                    </ReceiveChatWrapper>
                  )}
                  {isLast && <div ref={bottomRef} />}
                </React.Fragment>
              );
            })}
          </S.Chats>
        </S.ChatScrollWrapper>
      )}
      <S.InputWrapper $isActivate={messages.length > 0 ? true : false}>
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
