import { Container, Title, Books } from './styles';
import { SwitchIcon } from '@/shared/assets/icons';
import { TradeListItem } from '@/entities/trade';
import TradeActions from './TradeActions';
import TradeBook from './TradeBook';

const TradeCard = ({
  trade,
  type,
}: {
  trade: TradeListItem;
  type: 'RESPONSE' | 'REQUEST';
}) => {
  function handleClickDeetail() {
    console.log('detail');
  }
  function handleClickAccept() {
    console.log('accept');
  }

  function handleClickReject() {
    console.log('reject');
  }

  function handleClickDelete() {
    console.log('delete');
  }

  function handleClickEdit() {
    console.log('edit');
  }

  return (
    <Container onClick={handleClickDeetail}>
      <Title>{trade.seller.nickname}님의 제안</Title>
      <Books>
        <TradeBook item={trade.seller.item} />
        <SwitchIcon />
        <TradeBook item={trade.buyer.item} />
      </Books>
      <TradeActions
        type={type}
        onAccept={handleClickAccept}
        onReject={handleClickReject}
        onDelete={handleClickDelete}
        onEdit={handleClickEdit}
      />
    </Container>
  );
};

export default TradeCard;
