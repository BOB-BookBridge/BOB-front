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
    <div style={{ width: '100%' }}>
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
      {filteredNotifications.map((noti) => (
        <Notification key={noti.id} notification={noti} />
      ))}
    </div>
  );
};

export default NotificationList;

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
