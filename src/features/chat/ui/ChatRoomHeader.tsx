import { useRouter } from 'next/navigation';
import { useTheme } from 'styled-components';
import { ChatUser, useExitChatMutation } from '@/entities/chat';
import { useFABStore, useIsMobile } from '@/shared/model';
import * as S from './ChatRoom.styles';
import {
  ArrowBackIcon,
  ChatMeatballsIcon,
  DeleteIcon,
} from '@/shared/assets/icons';

interface ChatRoomHeaderProps {
  id: number;
  partner: ChatUser;
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
  const { setShow, setChatId } = useFABStore();
  const isMobile = useIsMobile();
  const { mutate: exitMutate } = useExitChatMutation();

  function handleBackClick() {
    if (isMobile) {
      router.replace('/chats');
    }
    setShow('LIST');
    setChatId(null);
  }

  function handleMeatballClick() {
    onClick();
  }

  function handleExitChat() {
    exitMutate(id, {
      onSuccess: () => {
        if (isMobile) {
          router.replace('/chats');
        } else {
          setShow('LIST');
          setChatId(null);
        }
      },
    });
  }

  function handleClickNickname() {
    router.push(`/profile/${partner.id}`);
  }
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
