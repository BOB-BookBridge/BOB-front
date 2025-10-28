'use client';

import React from 'react';
import styled from 'styled-components';
import { useFABStore, useWidgetStore } from '@/shared/model';
import { LocalErrorBoundary } from '@/shared/lib';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

const ChatWidget = () => {
  const activeWidget = useWidgetStore((s) => s.activeWidget);
  const show = useFABStore((s) => s.show);
  if (activeWidget !== 'chat') return null;

  return (
    <Container>
      {show === 'ROOM' ? (
        <LocalErrorBoundary>
          <ChatRoom />
        </LocalErrorBoundary>
      ) : (
        <React.Fragment>
          <TitleText>채팅</TitleText>
          <Div />
          <ListWrapper>
            <LocalErrorBoundary>
              <ChatList />
            </LocalErrorBoundary>
          </ListWrapper>
        </React.Fragment>
      )}
    </Container>
  );
};
export default ChatWidget;

export const Container = styled.div`
  padding-top: 5px;
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 393px;
  overflow-y: hidden;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 20px;
  height: 640px;
  z-index: ${({ theme }) => theme.zIndex.fab};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

export const TitleText = styled.div`
  padding-top: 20px;
  padding-left: 20px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
`;

export const Div = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.GRAY_300};
`;

export const ListWrapper = styled.div`
  overflow-y: auto;
  height: 570px;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => `${theme.colors.GRAY_700}`};
    border-radius: 5px;
    border-right: 1px solid transparent;
    background-clip: padding-box;
    box-sizing: border-box;
  }

  &::-webkit-scrollbar-button:vertical:start:increment,
  &::-webkit-scrollbar-button:vertical:end:decrement {
    display: block;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => `${theme.colors.GRAY_500}`};
  }
`;
