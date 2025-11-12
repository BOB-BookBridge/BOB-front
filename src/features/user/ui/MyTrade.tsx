import { TradeCard } from '@/features/trade/ui';
import { LocalErrorBoundary } from '@/shared/lib';
import SubTab from './SubTab';
import { useState } from 'react';
import { TradeListItem } from '@/entities/trade';
import styled from 'styled-components';

const trades: TradeListItem[] = [
  {
    id: 11,
    status: 'REJECTED',
    seller: {
      id: '0199ee09-412d-7ca0-8e43-b94ea5fb91ec',
      nickname: 'manager',
      item: {
        title: 'Real MySQL 8.0 1권 - 개발자와 DBA를 위한 MySQL 실전 가이드',
        cover:
          'https://image.aladin.co.kr/product/27848/87/cover500/k712734689_1.jpg',
        size: 1,
      },
    },
    buyer: {
      id: '0199ee10-a7ea-7300-a721-ce7f049bc4df',
      nickname: '이현수',
      item: {
        title: '파쇄',
        cover:
          'https://image.aladin.co.kr/product/31273/29/cover500/k592832565_1.jpg',
        size: 2,
      },
    },
  },
  {
    id: 12,
    status: 'REQUESTED',
    seller: {
      id: '0199ee09-412d-7ca0-8e43-b94ea5fb91ec',
      nickname: 'manager',
      item: {
        title: 'Real MySQL 8.0 1권 - 개발자와 DBA를 위한 MySQL 실전 가이드',
        cover:
          'https://image.aladin.co.kr/product/27848/87/cover500/k712734689_1.jpg',
        size: 1,
      },
    },
    buyer: {
      id: '0199f8c2-30ed-7ee3-a757-16196412518c',
      nickname: '이현수',
      item: {
        title: '안녕! 보노보노 컬러링 엽서북 - 애니메이션 원화로 그리는',
        cover:
          'https://image.aladin.co.kr/product/34116/30/cover500/k712931484_1.jpg',
        size: 2,
      },
    },
  },
];

const MyTrade = () => {
  const tabs = ['받은 제안', '보낸 제안'];
  const [selectedSubTab, setSelectedSubTab] = useState(0);

  function handleChangeSubTab(v: number) {
    setSelectedSubTab(v);
  }
  return (
    <div style={{ width: '100%' }}>
      <SubTab
        tabs={tabs}
        selected={selectedSubTab}
        onChange={handleChangeSubTab}
      />
      <LocalErrorBoundary>
        <TradeWrapper>
          {trades.map((trade) => (
            <TradeCard key={trade.id} trade={trade} type='RESPONSE' />
          ))}
        </TradeWrapper>
      </LocalErrorBoundary>
    </div>
  );
};

export default MyTrade;

const TradeWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 10px;
  }
`;
