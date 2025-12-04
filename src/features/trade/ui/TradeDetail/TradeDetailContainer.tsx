import {
  GetTradesReq,
  TradeStatus,
  useTradeDetailQuery,
} from '@/entities/trade';
import { ButtonSection, Container, InfoText } from './styles';
import { useTradeActions } from '../../model/useTradeActions';
import TradeActions from '../TradeCard/TradeActions';
import TradeDetail from '.';

const TradeDetailContainer = ({
  type,
  query,
  tradeId,
  status,
  handleEdit,
}: {
  type: 'REQUEST' | 'RESPONSE';
  query: GetTradesReq;
  tradeId: number;
  status: TradeStatus;
  handleEdit: () => void;
}) => {
  const { data: trade } = useTradeDetailQuery(tradeId);
  const { handleAccept, handleReject, handleCancel, handleDelete } =
    useTradeActions({
      tradeId,
      ...query,
    });
  return (
    <Container>
      {trade && <TradeDetail type={type} trade={trade} />}
      <ButtonSection>
        <TradeActions
          type={type}
          status={status}
          onAccept={handleAccept}
          onReject={handleReject}
          onCancel={handleCancel}
          onEdit={handleEdit}
          onDelete={handleDelete}
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

export default TradeDetailContainer;
