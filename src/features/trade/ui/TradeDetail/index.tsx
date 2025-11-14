import { GetTradesReq, useTradeDetailQuery } from '@/entities/trade';
import { useTradeActions } from '../../model/useTradeActions';
import TradeDetailBookItem from './TradeDetailBookItem';
import TradeActions from '../TradeCard/TradeActions';
import { SwitchIcon } from '@/shared/assets/icons';
import {
  ButtonSection,
  BooksSection,
  Container,
  InfoText,
  WorthSection,
  SectionTitle,
  Worth,
  WorthText,
} from './styles';

const TradeDetail = ({
  type,
  query,
  tradeId,
}: {
  type: 'REQUEST' | 'RESPONSE';
  query: GetTradesReq;
  tradeId: number;
}) => {
  const { handleAccept, handleReject, handleCancel, handleEdit } =
    useTradeActions({
      tradeId,
      ...query,
    });
  const { data: trade } = useTradeDetailQuery(tradeId);
  if (!trade) return;

  const other = type === 'REQUEST' ? trade.seller : trade.buyer;
  const me = type === 'REQUEST' ? trade.buyer : trade.seller;
  return (
    <Container>
      <BooksSection>
        <SectionTitle>상대방의 거래 도서</SectionTitle>
        {other.item.map((book) => (
          <TradeDetailBookItem key={book.id} book={book} isMine={false} />
        ))}
        <div style={{ height: 10 }} />
        <SectionTitle>나의 거래 도서</SectionTitle>
        {me.item.map((book) => (
          <TradeDetailBookItem key={book.id} book={book} isMine={true} />
        ))}
      </BooksSection>
      <WorthSection>
        <Worth>
          <InfoText>상대방</InfoText>
          <WorthText>{other.worth.toLocaleString()}원</WorthText>
        </Worth>
        <SwitchIcon />
        <Worth>
          <InfoText>나</InfoText>
          <WorthText>{me.worth.toLocaleString()}원</WorthText>
        </Worth>
      </WorthSection>
      <ButtonSection>
        <TradeActions
          type={type}
          onAccept={handleAccept}
          onReject={handleReject}
          onCancel={handleCancel}
          onEdit={handleEdit}
        />
      </ButtonSection>
      {type === 'RESPONSE' && (
        <InfoText>
          *거절 시 되돌릴 수 없으며, 수락 시 채팅방이 생성됩니다.
        </InfoText>
      )}
    </Container>
  );
};

export default TradeDetail;
