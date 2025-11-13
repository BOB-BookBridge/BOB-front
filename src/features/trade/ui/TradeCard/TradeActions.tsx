import { Button } from '@/shared/ui';

import * as S from './styles';
import { Size } from '@/shared/ui/Button';

interface TradeActionsProps {
  type: 'RESPONSE' | 'REQUEST';
  size?: Size;
  onAccept: () => void;
  onReject: () => void;
  onEdit: () => void;
  onDelete: () => void;
  stopParentClick?: boolean;
  onAfterAction?: () => void;
}

const TradeActions = ({
  type,
  size,
  onAccept,
  onReject,
  onEdit,
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
          text={type === 'RESPONSE' ? '거절' : '삭제'}
          size={size}
          variant='reject'
          onClick={(e: React.MouseEvent) =>
            handleClick(e, type === 'RESPONSE' ? onReject : onDelete)
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
