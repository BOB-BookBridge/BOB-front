'use client';

import { useMemo, useState } from 'react';
import styled from 'styled-components';
import Notification from './Notification';

const notifications = [
  {
    id: 7,
    type: 'TRADE',
    refId: 3,
    body: "[가면 산장 살인 사건]의 거래 상태가 '완료'(으)로 변경되었습니다.",
    isRead: false,
    createdAt: '2025-10-28T20:02:44.117573',
  },
  {
    id: 8,
    type: 'TRADE',
    refId: 4,
    body: "[파쇄]의 거래 상태가 '예약'(으)로 변경되었습니다.",
    isRead: true,
    createdAt: '2025-07-23T17:49:51.690796',
  },
] as const;

const tabs = [
  { value: 'ALL', label: '전체' },
  { value: 'UNREAD', label: '읽지 않음' },
] as const;

type TabOption = (typeof tabs)[number]['value'];

const NotificationList = () => {
  const [selectTab, setSelectTab] = useState<TabOption>('ALL');

  const filteredNotifications = useMemo(() => {
    return selectTab === 'ALL'
      ? notifications
      : notifications.filter((noti) => !noti.isRead);
  }, [selectTab]);

  function handleClickTab(value: TabOption) {
    setSelectTab(value);
  }
  return (
    <Container>
      <TabWrapper>
        {tabs.map((tab) => (
          <TabItem
            key={tab.value}
            $isSelect={tab.value === selectTab}
            onClick={() => handleClickTab(tab.value)}>
            {tab.label}
          </TabItem>
        ))}
      </TabWrapper>
      <NotificationWrapper>
        {filteredNotifications.map((noti) => (
          <Notification key={noti.id} notification={noti} />
        ))}
      </NotificationWrapper>
      <ReadAll>모두 읽음 표시</ReadAll>
    </Container>
  );
};

export default NotificationList;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TabWrapper = styled.ul`
  display: inline-flex;
  flex-wrap: nowrap;
  width: 100%;
  height: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY_300};
`;

interface TabItemProps {
  $isSelect: boolean;
}

const TabItem = styled.li<TabItemProps>`
  flex: 1;
  cursor: pointer;
  font-size: 16px;
  padding: 8px 20px;
  text-align: center;
  white-space: nowrap;
  flex-shrink: 0;
  font-weight: ${({ $isSelect }) => ($isSelect ? 500 : 400)};
  color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.BLACK : theme.colors.GRAY_500};
  border-bottom: 3px solid
    ${({ $isSelect, theme }) => ($isSelect ? theme.colors.BLACK : 'none')};
`;

const NotificationWrapper = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const ReadAll = styled.div`
  flex-shrink: 0;
  width: 100%;
  text-align: center;
  padding: 12px;
  cursor: pointer;
  border-top: 1px solid ${({ theme }) => theme.colors.GRAY_300};
  font-size: 13px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  color: ${({ theme }) => theme.colors.SECONDARY};

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_200};
  }
  &:active {
    transform: scale(0.97);
  }
`;
