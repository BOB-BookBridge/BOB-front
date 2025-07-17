import { useState } from 'react';
import { useTheme } from 'styled-components';
import {
  ArrowBackIcon,
  ChatMeatballsIcon,
  DeleteIcon,
} from '@/shared/assets/icons';
import * as S from './ChatRoom.styles';
import { useChatWidgetStore } from '@/shared/model';
import { useRouter } from 'next/navigation';

type Partner = {
  id: string;
  nickname: string;
  profileUrl: string | null;
};
interface ChatRoomHeaderProps {
  id: number;
  partner: Partner;
  isOpenMenu: boolean;
  onClick: () => void;
}
const ChatRoomHeader = ({
  id,
  partner,
  isOpenMenu,
  onClick,
}: ChatRoomHeaderProps) => {
  const theme = useTheme();
  const router = useRouter();
  const isOpen = useChatWidgetStore((s) => s.isOpen);
  const { setShow, setChatId } = useChatWidgetStore();

  function handleBackClick() {
    if (isOpen) {
      setShow('LIST');
      setChatId(null);
    } else router.back();
  }
  function handleMeatballClick() {
    onClick();
  }
  function handleExitChat() {}

  function handleClickNickname() {}
  return (
    <S.Header>
      <S.IconWrapper onClick={handleBackClick}>
        <ArrowBackIcon stroke={theme.colors.BLACK} strokeWidth={2} />
      </S.IconWrapper>
      <S.Nickname onClick={handleClickNickname}>{partner.nickname}</S.Nickname>
      <S.IconWrapper onClick={handleMeatballClick}>
        <ChatMeatballsIcon stroke={theme.colors.BLACK} strokeWidth={2} />
      </S.IconWrapper>
      {isOpenMenu && (
        <S.DropdownList>
          <S.DropdownItem $red={true} onClick={handleExitChat}>
            <DeleteIcon fill={theme.colors.ERROR} /> 채팅방 나가기
          </S.DropdownItem>
        </S.DropdownList>
      )}
    </S.Header>
  );
};

export default ChatRoomHeader;
