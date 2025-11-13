'use client';

import { useState } from 'react';
import { Container, Title, Books, ButtonSection } from './styles';
import { SwitchIcon } from '@/shared/assets/icons';
import { TradeListItem } from '@/entities/trade';
import TradeActions from './TradeActions';
import TradeBook from './TradeBook';
import { ModalLayout } from '@/shared/ui';
import TradeDetail from '../TradeDetail';
import { useTradeActions } from '../../model/useTradeActions';

const TradeCard = ({
  trade,
  type,
}: {
  trade: TradeListItem;
  type: 'RESPONSE' | 'REQUEST';
}) => {
  const { handleAccept, handleReject, handleDelete, handleEdit } =
    useTradeActions(trade.id);
  const [openDetail, setOpenDetail] = useState(false);
  function handleClickDetail() {
    setOpenDetail(true);
  }

  return (
    <>
      <Container onClick={handleClickDetail}>
        <Title>{trade.seller.nickname}님의 제안</Title>
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
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </ButtonSection>
      </Container>
      {openDetail && (
        <ModalLayout
          isOpen={openDetail}
          title={`${trade.buyer.nickname}님의 거래 요청`}
          onClose={() => setOpenDetail(false)}>
          <TradeDetail type={type} />
        </ModalLayout>
      )}
    </>
  );
};

export default TradeCard;
