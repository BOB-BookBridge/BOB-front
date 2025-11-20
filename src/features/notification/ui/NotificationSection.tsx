'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { LocalErrorBoundary } from '@/shared/lib';
import NotificationList from './NotificationList';

const tabs = [
  { value: 'ALL', label: '전체' },
  { value: 'UNREAD', label: '읽지 않음' },
] as const;

export type NotiTabOption = (typeof tabs)[number]['value'];

const NotificationSection = () => {
  const [selectTab, setSelectTab] = useState<NotiTabOption>('ALL');

  function handleClickTab(value: NotiTabOption) {
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
      <LocalErrorBoundary>
        <NotificationList selectTab={selectTab} />
      </LocalErrorBoundary>
      <ReadAll>모두 읽음 표시</ReadAll>
    </Container>
  );
};

export default NotificationSection;

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
