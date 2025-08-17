import { useState } from 'react';
import styled from 'styled-components';
import { SelectBuyerSubmitData } from '../../listing/ui/detail/EditMenu';
import DefaultProfile from '@/shared/assets/default-profile.svg';
import { TradeStatus, useTradeQuery } from '@/entities/trade';
import { Button, LoadingIndicator } from '@/shared/ui';
import { SelectIcon } from '@/shared/assets/icons';
import { colors } from '@/shared/constants';

interface SelectBuyerFormProps {
  postId: number;
  onSubmit: (data: SelectBuyerSubmitData) => void;
  mode: TradeStatus;
  onClose: () => void;
}
const SelectBuyerForm = ({
  postId,
  onSubmit,
  mode,
  onClose,
}: SelectBuyerFormProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data, isPending } = useTradeQuery(postId);
  function handleClickApply() {
    if (selectedId) {
      onSubmit({
        tradeId: selectedId,
        status: mode,
      });
    }
  }

  function handleClickItem(id: number) {
    setSelectedId(id);
  }
  return (
    <Container>
      <ListWrapper>
        {isPending ? (
          <LoadingIndicator text='불러오는중' />
        ) : (
          data &&
          data.trades.map((trade) => {
            const isSelected = selectedId === trade.tradeId;
            return (
              <ListItem
                key={trade.tradeId}
                $isSelected={isSelected}
                onClick={() => handleClickItem(trade.tradeId)}>
                <ItemLeftSection>
                  {trade.buyer.profile ? (
                    <img src={trade.buyer.profile} />
                  ) : (
                    <DefaultProfile width={30} />
                  )}
                  <NicknameText>{trade.buyer.nickname}</NicknameText>
                </ItemLeftSection>
                {isSelected && <SelectIcon />}
              </ListItem>
            );
          })
        )}
      </ListWrapper>
      <ButtonGroup>
        <div style={{ width: '30%', maxWidth: 150 }}>
          <Button variant='cancel' text='취소' onClick={onClose} />
        </div>
        <div style={{ width: '70%', maxWidth: 300 }}>
          <Button
            variant={selectedId ? 'primary' : 'disabled'}
            onClick={handleClickApply}
            text='선택 완료'
          />
        </div>
      </ButtonGroup>
    </Container>
  );
};

export default SelectBuyerForm;

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const ListWrapper = styled.div`
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

interface ListItemProps {
  $isSelected: boolean;
}
const ListItem = styled.div<ListItemProps>`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  padding: 10px;
  cursor: pointer;
  background-color: ${({ $isSelected }) =>
    $isSelected ? colors.light.PRIMARY_100 : 'transparent'};
  color: ${({ $isSelected }) => ($isSelected ? colors.light.BLACK : 'inherit')};
`;

const ItemLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const NicknameText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
  width: 100%;
`;
