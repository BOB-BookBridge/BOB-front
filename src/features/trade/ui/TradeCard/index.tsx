'use client';

import { useState } from 'react';
import { GetTradesReq, TradeListItem } from '@/entities/trade';
import { useTradeActions } from '../../model/useTradeActions';
import { SwitchIcon } from '@/shared/assets/icons';
import { ModalLayout } from '@/shared/ui';
import TradeActions from './TradeActions';
import TradeDetail from '../TradeDetail';
import TradeBook from './TradeBook';
import {
  Container,
  Title,
  Books,
  ButtonSection,
  TitleSection,
  RejectText,
} from './styles';

const TradeCard = ({
  trade,
  type,
  query,
}: {
  trade: TradeListItem;
  type: 'RESPONSE' | 'REQUEST';
  query: GetTradesReq;
}) => {
  const { handleAccept, handleReject, handleCancel, handleEdit } =
    useTradeActions({
      tradeId: trade.id,
      ...query,
    });
  const [openDetail, setOpenDetail] = useState(false);
  function handleClickDetail() {
    setOpenDetail(true);
  }

  return (
    <>
      <Container onClick={handleClickDetail}>
        <TitleSection>
          <Title>{trade.buyer.nickname}님의 제안</Title>
          {trade.status === 'REJECTED' && <RejectText>(거절됨)</RejectText>}
        </TitleSection>
        <Books>
          <TradeBook item={trade.seller.item} />
          <SwitchIcon />
          <TradeBook item={trade.buyer.item} />
        </Books>
        <ButtonSection>
          <TradeActions
            type={type}
            size='xs'
            stopParentClick={true}
            onAccept={handleAccept}
            onReject={handleReject}
            onCancel={handleCancel}
            onEdit={handleEdit}
          />
        </ButtonSection>
      </Container>
      {openDetail && (
        <ModalLayout
          isOpen={openDetail}
          title={`${trade.buyer.nickname}님의 거래 요청`}
          onClose={() => setOpenDetail(false)}>
          <TradeDetail type={type} query={query} tradeId={trade.id} />
        </ModalLayout>
      )}
    </>
  );
};

export default TradeCard;
