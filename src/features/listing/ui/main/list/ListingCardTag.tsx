import styled from 'styled-components';
import { colors } from '../../../../../shared/constants';
import { bookStatusMap, tradeStatusMap } from '@/shared/lib';
import { BookStatus } from '@/entities/listing/types';
import { TradeStatus } from '@/entities/trade';

type TagTradeStatus = Exclude<TradeStatus, 'RESERVED' | 'COMPLETED'>;

type TagProps =
  | { $bookStatus: BookStatus; $tradeStatus?: never }
  | { $bookStatus?: never; $tradeStatus: TagTradeStatus };

const ListingCardTag = ({ $bookStatus, $tradeStatus }: TagProps) => {
  const text = $bookStatus
    ? bookStatusMap[$bookStatus]
    : tradeStatusMap[$tradeStatus];

  const backgroundColor = $bookStatus
    ? colors.light.BOOK_STATUS[$bookStatus]
    : 'rgba(0,0,0,0.5)';

  return <Container $backgroundColor={backgroundColor}>#{text}</Container>;
};

export default ListingCardTag;

const Container = styled.div<{ $backgroundColor: string }>`
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  padding: 3px 5px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.light.WHITE};
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 10px;
  }
`;
