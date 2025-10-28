import styled from 'styled-components';
import { NotificationData } from '@/entities/notification';
import { NotiTradeIcon } from '@/shared/assets/icons';
import { convertDiffToString } from '@/shared/lib';

const NotiTitle = {
  TRADE: {
    label: '거래 알림',
    icon: NotiTradeIcon,
  },
} as const;

const Notification = ({ notification }: { notification: NotificationData }) => {
  const Icon = NotiTitle[notification.type].icon;

  return (
    <Container $isRead={notification.isRead}>
      <Icon />
      <Content>
        <div>{NotiTitle[notification.type].label}</div>
        <div>{notification.body}</div>
      </Content>
      <Time $isRead={notification.isRead}>
        {convertDiffToString(notification.createdAt)}
      </Time>
    </Container>
  );
};

export default Notification;

const Container = styled.div<{ $isRead: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 8px 20px;
  background-color: ${({ $isRead, theme }) =>
    $isRead ? 'none' : theme.colors.SECONDARY_100};
  color: ${({ $isRead, theme }) =>
    $isRead ? theme.colors.GRAY_500 : theme.colors.BLACK};
  font-size: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY_200};
  cursor: pointer;
  transition: background-color 0.15s ease;

  svg {
    fill: currentColor;
  }

  &:hover {
    background-color: ${({ $isRead, theme }) =>
      $isRead ? theme.colors.GRAY_200 : theme.colors.SECONDARY_200};
  }

  &:active {
    transform: scale(0.99);
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  div:first-child {
    font-weight: 600;
  }

  div:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Time = styled.div<{ $isRead: boolean }>`
  white-space: nowrap;
  color: ${({ $isRead, theme }) =>
    $isRead ? theme.colors.GRAY_500 : theme.colors.GRAY_600};
  font-size: 11px;
  align-self: flex-end;
  flex-shrink: 0;
`;
