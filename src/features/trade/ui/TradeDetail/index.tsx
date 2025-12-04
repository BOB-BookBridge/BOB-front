import TradeDetailBookItem from './TradeDetailBookItem';
import { GetTradeDetailRes } from '@/entities/trade';
import { SwitchIcon } from '@/shared/assets/icons';
import {
  BooksSection,
  InfoText,
  WorthSection,
  SectionTitle,
  Worth,
  WorthText,
} from './styles';

const TradeDetail = ({
  type,
  trade,
}: {
  type: 'REQUEST' | 'RESPONSE';
  trade: GetTradeDetailRes;
}) => {
  if (!trade) return;

  const other = type === 'REQUEST' ? trade.seller : trade.buyer;
  const me = type === 'REQUEST' ? trade.buyer : trade.seller;
  return (
    <>
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
    </>
  );
};

export default TradeDetail;
