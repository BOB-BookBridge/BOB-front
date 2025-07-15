import styled from 'styled-components';

export const Container = styled.div`
  margin: 10px 0;
  width: 100%;
  height: 100%;
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
  overflow-y: scroll;
  height: 70%;
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

export const MessageInfo = styled.div``;

export const UnreadText = styled.div`
  color: ${({ theme }) => theme.colors.PRIMARY};
  font-size: 11px;
  font-weight: 600;
  text-align: end;
`;

export const TimeText = styled.div`
  color: ${({ theme }) => theme.colors.GRAY_600};
  font-size: 11px;
  margin-bottom: 5px;
`;

export const InputSection = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

export const InputWrapper = styled.div`
  width: 100%;
  flex: 1;
  margin: 0 10px;
  padding-right: 8px;
  border: 1px ${({ theme }) => theme.colors.GRAY_400} solid;
  border-radius: 15px;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  flex: 1;
  border: none;
  outline: none;
  padding: 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: transparent;
  caret-color: ${({ theme }) => theme.colors.BLACK};

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_500};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.BLACK};
    -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.WHITE}
      inset;
    box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.WHITE} inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
