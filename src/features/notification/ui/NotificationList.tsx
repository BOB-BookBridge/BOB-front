import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useIsMobile, useWidgetStore } from '@/shared/model';
import { NotificationItem } from '@/entities/notification';
import { NotiTabOption } from './NotificationSection';
import { LoadingIndicator } from '@/shared/ui';
import Notification from './Notification';
import {
  useNotificationQuery,
  useReadNotificationMutation,
} from '@/entities/notification/queries';

interface NotificationListProps {
  selectTab: NotiTabOption;
}

const NotificationList = ({ selectTab }: NotificationListProps) => {
  const { data, isLoading } = useNotificationQuery();
  const { mutate: readMutate } = useReadNotificationMutation();
  const router = useRouter();
  const { setActiveWidget } = useWidgetStore();
  const isMobile = useIsMobile();
  const notifications = data?.notifications ?? [];

  const reversed = [...notifications].reverse();

  const filteredNotifications =
    selectTab === 'ALL' ? reversed : reversed.filter((noti) => !noti.isRead);

  function handleClickItem(noti: NotificationItem) {
    if (!noti.isRead) {
      readMutate(noti.id);
    }
    if (!isMobile) setActiveWidget(null);
    router.push(`/listings/${noti.refId}`);
  }
  return (
    <NotificationWrapper>
      {isLoading ? (
        <LoadingWrapper>
          <LoadingIndicator text='불러오는중' />
        </LoadingWrapper>
      ) : (
        filteredNotifications.map((noti) => (
          <Notification
            key={noti.id}
            notification={noti}
            onClick={() => handleClickItem(noti)}
          />
        ))
      )}
    </NotificationWrapper>
  );
};

export default NotificationList;

const NotificationWrapper = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const LoadingWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
