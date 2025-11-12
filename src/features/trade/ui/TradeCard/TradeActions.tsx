import { Button } from '@/shared/ui';

import * as S from './styles';

interface TradeActionsProps {
  type: 'RESPONSE' | 'REQUEST';
  onAccept: () => void;
  onReject: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TradeActions = ({
  type,
  onAccept,
  onReject,
  onEdit,
  onDelete,
}: TradeActionsProps) => {
  const handleClick = (e: React.MouseEvent, callback: () => void) => {
    e.stopPropagation();
    callback();
  };

  return (
    <S.ButtonSection>
      <S.ButtonWrapper>
        <Button
          text={type === 'RESPONSE' ? '거절' : '삭제'}
          size='xs'
          variant='cancel'
          onClick={(e: React.MouseEvent) =>
            handleClick(e, type === 'RESPONSE' ? onReject : onDelete)
          }
        />
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <Button
          text={type === 'RESPONSE' ? '수락' : '수정'}
          size='xs'
          onClick={(e: React.MouseEvent) =>
            handleClick(e, type === 'RESPONSE' ? onAccept : onEdit)
          }
        />
      </S.ButtonWrapper>
    </S.ButtonSection>
  );
};

export default TradeActions;
