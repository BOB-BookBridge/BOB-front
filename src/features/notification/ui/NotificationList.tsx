import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { LoadingContainer } from '@/shared/ui/LoadingIndicator';
import InquiryNotiModalContent from './InquiryNotiModalContent';
import { useIsMobile, useWidgetStore } from '@/shared/model';
import { LoadingIndicator, ModalLayout } from '@/shared/ui';
import { NotificationModel } from '@/entities/notification';
import { NotiTabOption } from './NotificationSection';
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
  const notifications = data ?? [];
  const [openModal, setOpenModal] = useState<{
    type: 'INQUIRY' | 'REPORT' | null;
    refId: number | null;
  }>({ type: null, refId: null });
  const [modalTitle, setModalTitle] = useState('');
  const reversed = [...notifications].reverse();

  const filteredNotifications =
    selectTab === 'ALL' ? reversed : reversed.filter((noti) => !noti.isRead);

  function handleClickItem(noti: NotificationModel) {
    if (!noti.isRead) {
      readMutate(noti.id);
    }
    if (noti.type === 'TRADE') {
      if (!isMobile) setActiveWidget(null);
      router.push(`/listings/${noti.refId}`);
      return;
    }
    setModalTitle(
      noti.type === 'INQUIRY'
        ? '문의 상세'
        : noti.type === 'REPORT'
          ? '신고 상세'
          : '',
    );
    setOpenModal({
      type: noti.type as 'INQUIRY' | 'REPORT',
      refId: noti.refId,
    });
  }

  const getModalContent = () => {
    if (openModal.type === 'INQUIRY' && openModal.refId) {
      return <InquiryNotiModalContent refId={openModal.refId} />;
    }
    if (openModal.type === 'REPORT') {
      return (
        <div>
          <p>신고가 접수되었습니다.</p>
          <p>자세한 내용은 문의 부탁드립니다.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <NotificationWrapper>
      {isLoading ? (
        <LoadingContainer>
          <LoadingIndicator />
        </LoadingContainer>
      ) : (
        filteredNotifications.map((noti) => (
          <Notification
            key={noti.id}
            notification={noti}
            onClick={() => handleClickItem(noti)}
          />
        ))
      )}
      {openModal.type && (
        <ModalLayout
          title={modalTitle}
          isOpen={!!openModal}
          onClose={() => setOpenModal({ type: null, refId: null })}>
          {getModalContent()}
        </ModalLayout>
      )}
    </NotificationWrapper>
  );
};

export default NotificationList;

const NotificationWrapper = styled.div`
  overflow-y: auto;
  flex: 1;
`;
