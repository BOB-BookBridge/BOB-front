import { useState } from 'react';
import styled from 'styled-components';
import { EmptyMessage } from '@/features/listing/ui/main/list/ListingList';
import { SelectBuyerSubmitData } from '../../listing/ui/detail/EditMenu';
import { TradeStatus, usePostTradeQuery } from '@/entities/trade';
import DefaultProfile from '@/shared/assets/default-profile.svg';
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
  const { data, isPending } = usePostTradeQuery(postId, true);

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
          <LoadingIndicator />
        ) : data && data.trades ? (
          data.trades.map((trade) => {
            const isSelected = selectedId === trade.id;
            return (
              <ListItem
                key={trade.id}
                $isSelected={isSelected}
                onClick={() => handleClickItem(trade.id)}>
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
        ) : (
          <EmptyMessage>이 게시글에서 대화한 사용자가 없습니다.</EmptyMessage>
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
