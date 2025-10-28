import { useRouter } from 'next/navigation';
import { useWidgetStore } from './useWidgetStore';
import { useFABStore } from './useFABStore';
import { useIsMobile } from './useIsMobile';

type WidgetType = 'chat' | 'notification';

export const useHandleOpenWidget = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { setShow, setChatId, setIsOpen } = useFABStore();
  const { setActiveWidget } = useWidgetStore();
  return ({
    e,
    chatId,
    type,
  }: {
    e?: React.MouseEvent;
    chatId?: number;
    type: WidgetType;
  }) => {
    if (isMobile) {
      if (type === 'chat') router.push(chatId ? `/chats/${chatId}` : '/chats');
      if (type === 'notification') router.push('/notification');
      return;
    } else {
      e?.stopPropagation();
      setActiveWidget(type);
      if (type === 'chat') {
        if (chatId) {
          setShow('ROOM');
          setChatId(chatId);
        }
        setIsOpen(true);
      }
    }
  };
};
