import { useRouter } from 'next/navigation';
import { useFABStore } from './useFABStore';
import { useIsMobile } from './useIsMobile';

export const useHandleOpenChat = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { setShow, setChatId, setIsOpen, setChatIsOpen } = useFABStore();

  return ({ e, chatId }: { e?: React.MouseEvent; chatId?: number }) => {
    if (isMobile) {
      router.push(chatId ? `/chats/${chatId}` : '/chats');
    } else {
      e?.stopPropagation();
      if (chatId) {
        setShow('ROOM');
        setChatId(chatId);
      }
      setChatIsOpen(true);
      setIsOpen(true);
    }
  };
};
