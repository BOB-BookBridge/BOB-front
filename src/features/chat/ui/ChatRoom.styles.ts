import styled from 'styled-components';

export const Container = styled.div`
  margin: 10px 0;
`;

export const Header = styled.div`
  display: flex;
  margin: 0 10px;
  justify-content: space-between;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

export const Nickname = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  gap: 10px;
`;

export const ImageWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  overflow: hidden;
`;

export const InfoTop = styled.div`
  display: flex;
`;

export const InfoBottom = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const Status = styled.div<{ $clickable: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  ${({ $clickable }) => $clickable && 'cursor: pointer;'}
`;

export const StatusText = styled.div`
  font-size: 14px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleText = styled.div`
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
`;

export const Chats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
`;

export const NoticeWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const DateText = styled.div`
  color: ${({ theme }) => theme.colors.GRAY_600};
  font-weight: 500;
  font-size: 11px;
  padding: 2px 12px;
  border-radius: 20px;
`;

export const ReceiveChatWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: end;
  gap: 5px;
`;

export const ReceiveChat = styled.div`
  background-color: ${({ theme }) => theme.colors.GRAY_300};
  color: ${({ theme }) => theme.colors.BLACK};
  padding: 8px 12px;
  border-radius: 16px 16px 16px 0;
  max-width: 60%;
`;

export const SendChatWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: end;
  gap: 5px;
`;

export const SendChat = styled.div`
  background-color: ${({ theme }) => theme.colors.SENDCHAT_BACK};
  color: ${({ theme }) => theme.colors.SENDCHAT_TEXT};
  padding: 8px 12px;
  border-radius: 16px 16px 0 16px;
  max-width: 60%;
`;

export const TimeText = styled.div`
  color: ${({ theme }) => theme.colors.GRAY_600};
  font-size: 11px;
  margin-bottom: 5px;
`;

export const Input = styled.div``;
