'use client';

import styled from 'styled-components';
import { CloseIcon } from '@/shared/assets/icons';
import { useWidgetStore } from '@/shared/model';
import { NotificationSection } from '.';

const NotificationWidget = () => {
  const activeWidget = useWidgetStore((s) => s.activeWidget);
  const { setActiveWidget } = useWidgetStore();
  if (activeWidget !== 'notification') return;

  function handleClose() {
    setActiveWidget(null);
  }
  return (
    <>
      <Overlay onClick={handleClose} />
      <Container>
        <Header>
          <div>알림</div>
          <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
        </Header>
        <NotificationListContainer>
          <NotificationSection />
        </NotificationListContainer>
      </Container>
    </>
  );
};

export default NotificationWidget;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ theme }) => theme.zIndex.notiOverlay};
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  padding-top: 5px;
  position: fixed;
  top: 50px;
  right: 10px;
  width: 393px;
  overflow-y: hidden;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 20px;
  height: 640px;
  display: flex;
  flex-direction: column;
  z-index: ${({ theme }) => theme.zIndex.noti};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
  font-size: 20px;
  font-weight: 600;
`;

const NotificationListContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;
