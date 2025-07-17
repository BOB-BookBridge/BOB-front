import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  margin: 5px 10px;
  justify-content: space-between;
  position: relative;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export const Nickname = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
`;

export const Overlay = styled.div`
  margin-top: 10px;
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: ${({ theme }) => theme.zIndex.overlay};
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 10px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: ${({ theme }) => theme.zIndex.overlay + 1};
`;

export const DropdownItem = styled.div<{ $red?: boolean }>`
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px;
  font-size: 13px;
  gap: 5px;
  display: flex;
  justify-content: left;
  align-items: center;
  white-space: nowrap;
  color: ${({ $red, theme }) =>
    $red ? theme.colors.ERROR : theme.colors.BLACK};

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_300};
  }
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
  position: relative;
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
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;

  &::-webkit-scrollbar {
    width: 10px;
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
  display: inline-block;
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

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  gap: 4px;
  position: relative;
  cursor: pointer;
`;

export const ImageThumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 5px;
`;

export const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export const OverlayText = styled.div`
  color: white;
  font-weight: 600;
  font-size: 20px;
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
  padding: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  min-height: 60px;
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
