import { useState } from 'react';
import styled from 'styled-components';
import { GetTradesReq, useTradeQuery } from '@/entities/trade';
import { LocalErrorBoundary } from '@/shared/lib';
import { TradeCard } from '@/features/trade/ui';
import { LoadingIndicator } from '@/shared/ui';
import SubTab from './SubTab';

const resQuery: GetTradesReq = {
  key: 'RECEIVED',
  status: ['REQUESTED'],
};

const reqQuery: GetTradesReq = {
  key: 'SENT',
  status: ['REQUESTED', 'REJECTED'],
};

const MyTrade = () => {
  const tabs = ['받은 제안', '보낸 제안'];
  const [selectedSubTab, setSelectedSubTab] = useState(0);
  const { data, isPending } = useTradeQuery(
    selectedSubTab === 0 ? resQuery : reqQuery,
  );

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
        {isPending ? (
          <ContentsContainer>
            <LoadingIndicator text='불러오는중' />
          </ContentsContainer>
        ) : data && data.trades.length <= 0 ? (
          <ContentsContainer>
            <EmptyText>
              {selectedSubTab === 0
                ? '받은 제안이 없습니다.'
                : '보낸 제안이 없습니다.'}
            </EmptyText>
          </ContentsContainer>
        ) : (
          data &&
          data.trades && (
            <TradeWrapper>
              {data.trades.map((trade) => (
                <TradeCard
                  key={trade.id}
                  trade={trade}
                  type={selectedSubTab === 0 ? 'RESPONSE' : 'REQUEST'}
                  query={selectedSubTab === 0 ? resQuery : reqQuery}
                />
              ))}
            </TradeWrapper>
          )
        )}
      </LocalErrorBoundary>
    </div>
  );
};

export default MyTrade;

const ContentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;
const TradeWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 10px;
  }
`;
