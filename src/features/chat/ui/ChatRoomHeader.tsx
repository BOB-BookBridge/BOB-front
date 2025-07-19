import { useRouter } from 'next/navigation';
import { useTheme } from 'styled-components';
import { useFABStore, useIsMobile } from '@/shared/model';
import { useExitChatMutation } from '@/entities/chat';
import * as S from './ChatRoom.styles';
import {
  ArrowBackIcon,
  ChatMeatballsIcon,
  DeleteIcon,
} from '@/shared/assets/icons';

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
  const isOpen = useFABStore((s) => s.chatIsOpen);
  const { reset, setShow, setChatId } = useFABStore();
  const isMobile = useIsMobile();
  const { mutate: exitMutate } = useExitChatMutation();
  function handleBackClick() {
    reset();
    if (!isOpen) router.back();
  }
  function handleMeatballClick() {
    onClick();
  }
  function handleExitChat() {
    exitMutate(id, {
      onSuccess: () => {
        if (isMobile) {
          router.back();
        } else {
          setShow('LIST');
          setChatId(null);
        }
      },
    });
  }

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
