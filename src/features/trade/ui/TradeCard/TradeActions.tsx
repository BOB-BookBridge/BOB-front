import { TradeStatus } from '@/entities/trade';
import { Size } from '@/shared/ui/Button';
import { Button } from '@/shared/ui';
import * as S from './styles';

interface TradeActionsProps {
  type: 'RESPONSE' | 'REQUEST';
  size?: Size;
  status: TradeStatus;
  onAccept: () => void;
  onReject: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onDelete: () => void;
  stopParentClick?: boolean;
  onAfterAction?: () => void;
}

const TradeActions = ({
  type,
  size,
  status,
  onAccept,
  onReject,
  onEdit,
  onCancel,
  onDelete,
  stopParentClick,
  onAfterAction,
}: TradeActionsProps) => {
  const handleClick = (e: React.MouseEvent, callback: () => void) => {
    if (stopParentClick) {
      e.stopPropagation();
    }
    onAfterAction?.();
    callback();
  };

  return (
    <>
      <S.ButtonWrapper>
        <Button
          text={
            type === 'RESPONSE'
              ? '거절'
              : status === 'REJECTED'
                ? '삭제'
                : '취소'
          }
          size={size}
          variant='reject'
          onClick={(e: React.MouseEvent) =>
            handleClick(
              e,
              type === 'RESPONSE'
                ? onReject
                : status === 'REJECTED'
                  ? onDelete
                  : onCancel,
            )
          }
        />
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <Button
          text={type === 'RESPONSE' ? '수락' : '수정'}
          size={size}
          onClick={(e: React.MouseEvent) =>
            handleClick(e, type === 'RESPONSE' ? onAccept : onEdit)
          }
        />
      </S.ButtonWrapper>
    </>
  );
};

export default TradeActions;
