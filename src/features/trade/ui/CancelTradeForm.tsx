import { useState } from 'react';
import styled from 'styled-components';
import { CancelSubmitData } from '../../listing/ui/detail/EditMenu';
import { Button } from '@/shared/ui';

interface CancelTradeFormProps {
  onSubmit: (data: CancelSubmitData) => void;
  onClose: () => void;
}

const CancelTradeForm = ({ onSubmit, onClose }: CancelTradeFormProps) => {
  const [value, setValue] = useState('');

  return (
    <Container>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='취소 사유를 입력해주세요'
        rows={4}
      />
      <Footer>
        <Notice>*제출 시 예약자/구매자에게 사유가 전달돼요</Notice>
        <ButtonGroup>
          <Button size='sm' variant='cancel' text='취소' onClick={onClose} />
          <Button
            size='sm'
            variant={!value.trim() ? 'disabled' : 'primary'}
            onClick={() => onSubmit({ reason: value })}
            text='제출'
          />
        </ButtonGroup>
      </Footer>
    </Container>
  );
};

export default CancelTradeForm;

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  resize: none;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  background-color: transparent;
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.BLACK};
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_500};
    font-size: 14px;
  }
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Notice = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  gap: 8px;
  margin-top: 8px;
  width: 40%;
`;
