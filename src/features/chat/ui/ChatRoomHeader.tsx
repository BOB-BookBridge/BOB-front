import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'styled-components';
import { ChatUser, useExitChatMutation } from '@/entities/chat';
import { useFABStore, useIsMobile } from '@/shared/model';
import * as S from './ChatRoom.styles';
import {
  ArrowBackIcon,
  ChatMeatballsIcon,
  DeleteIcon,
  SirenIcon,
} from '@/shared/assets/icons';
import { ModalLayout, ReportModalContents } from '@/shared/ui';

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
  const [isOpenReport, setIsOpenReport] = useState(false);

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

  function handleReportChat() {
    console.log('신고');
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
          <S.DropdownItem onClick={() => setIsOpenReport(true)}>
            <SirenIcon stroke={theme.colors.BLACK} strokeWidth={2} /> 신고하기
          </S.DropdownItem>
          <S.DropdownItem $red={true} onClick={handleExitChat}>
            <DeleteIcon fill={theme.colors.ERROR} /> 채팅방 나가기
          </S.DropdownItem>
        </S.DropdownList>
      )}
      {isOpenReport && (
        <ModalLayout
          isOpen={isOpenReport}
          onClose={() => setIsOpenReport(false)}
          title='신고 사유 선택'>
          <ReportModalContents
            type='CHAT'
            refId={id}
            onClose={() => setIsOpenReport(false)}
          />
        </ModalLayout>
      )}
    </S.Header>
  );
};

export default ChatRoomHeader;
