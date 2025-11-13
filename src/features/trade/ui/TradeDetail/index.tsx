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
import { useTradeActions } from '../../model/useTradeActions';
import TradeDetailBookItem from './TradeDetailBookItem';
import TradeActions from '../TradeCard/TradeActions';
import { SwitchIcon } from '@/shared/assets/icons';

const trade = {
  id: 11,
  status: 'REQUESTED',
  post: {
    id: 1,
    title: 'Real MySQL 8.0 1권 - 개발자와 DBA를 위한 MySQL 실전 가이드',
    cover:
      'https://image.aladin.co.kr/product/27848/87/cover500/k712734689_1.jpg',
  },
  seller: {
    id: '0199ee09-412d-7ca0-8e43-b94ea5fb91ec',
    nickname: 'manager',
    worth: 30000,
    item: [
      {
        id: 1,
        status: 'BEST' as const,
        title: 'Real MySQL 8.0 1권 - 개발자와 DBA를 위한 MySQL 실전 가이드',
        author: '백은빈.이성욱 지음',
        priceStandard: 30000,
        cover:
          'https://image.aladin.co.kr/product/27848/87/cover500/k712734689_1.jpg',
        pubDate: '2021-09-07',
        available: false,
      },
    ],
  },
  buyer: {
    id: '0199ee10-a7ea-7300-a721-ce7f049bc4df',
    nickname: 'leehs',
    worth: 29800,
    item: [
      {
        id: 13,
        status: 'BEST' as const,
        title: '파쇄',
        author: '구병모 지음',
        priceStandard: 13000,
        cover:
          'https://image.aladin.co.kr/product/31273/29/cover500/k592832565_1.jpg',
        pubDate: '2023-03-07',
        available: false,
      },
      {
        id: 14,
        status: 'MEDIUM' as const,
        title: '독설의 팡세',
        author: '에밀 시오랑 지음, 김정숙 옮김',
        priceStandard: 16800,
        cover:
          'https://image.aladin.co.kr/product/35536/57/cover500/k072036170_1.jpg',
        pubDate: '2025-01-10',
        available: false,
      },
    ],
  },
};
const TradeDetail = ({ type }: { type: 'REQUEST' | 'RESPONSE' }) => {
  const other = type === 'REQUEST' ? trade.buyer : trade.seller;
  const me = type === 'REQUEST' ? trade.seller : trade.buyer;
  const { handleAccept, handleReject, handleDelete, handleEdit } =
    useTradeActions(trade.id);
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
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </ButtonSection>
      <InfoText>
        *거절 시 되돌릴 수 없으며, 수락 시 채팅방이 생성됩니다.
      </InfoText>
    </Container>
  );
};

export default TradeDetail;
