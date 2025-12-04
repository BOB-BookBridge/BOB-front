'use client';

import { useState } from 'react';
import TradeDetailContainer from '../TradeDetail/TradeDetailContainer';
import { useTradeActions } from '../../model/useTradeActions';
import { SwitchIcon } from '@/shared/assets/icons';
import { ModalLayout } from '@/shared/ui';
import TradeActions from './TradeActions';
import TradeBook from './TradeBook';
import { TradeRequest } from '..';
import {
  GetTradesReq,
  TradeListModel,
  useTradeDetailQuery,
} from '@/entities/trade';
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
  trade: TradeListModel;
  type: 'RESPONSE' | 'REQUEST';
  query: GetTradesReq;
}) => {
  const { handleAccept, handleReject, handleCancel, handleDelete } =
    useTradeActions({
      tradeId: trade.id,
      ...query,
    });
  const { data: detailData } = useTradeDetailQuery(trade.id);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  function handleClickDetail() {
    setOpenDetail(true);
  }

  function handleEdit() {
    setOpenDetail(false);
    setOpenEdit(true);
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
            status={trade.status}
            onAccept={handleAccept}
            onReject={handleReject}
            onCancel={handleCancel}
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
          <TradeDetailContainer
            type={type}
            query={query}
            tradeId={trade.id}
            status={trade.status}
            handleEdit={handleEdit}
          />
        </ModalLayout>
      )}
      {openEdit && (
        <ModalLayout
          isOpen={openEdit}
          title='교환할 책을 선택해 주세요'
          onClose={() => setOpenEdit(false)}>
          <TradeRequest
            onClose={() => setOpenEdit(false)}
            prevItems={detailData?.buyer.item.map((i) => i.id)}
            tradeId={trade.id}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default TradeCard;
