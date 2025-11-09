import { BookStatus } from '@/entities/listing';
import { bookStatusList } from '@/features/listing/ui/main/filter/FilterContent';
import { HELP_MESSAGES } from '@/shared/constants';
import { bookStatusMap } from '@/shared/lib';
import { Button, CheckCircle } from '@/shared/ui';
import { useState } from 'react';
import styled from 'styled-components';

const SelectBookStatus = ({
  onSelect,
}: {
  onSelect: (bookStatus: BookStatus) => void;
}) => {
  const [bookStatus, setBookStatus] = useState<BookStatus | undefined>();

  function handleSelectStatus() {
    if (!bookStatus) return;
    onSelect(bookStatus);
    setBookStatus(undefined);
  }

  return (
    <StatusSection>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
        }}>
        {bookStatusList.map((status) => (
          <CheckCircle
            key={status}
            id={bookStatusMap[status]}
            checked={bookStatus === status}
            onChange={() => setBookStatus(status)}
            label={
              <OptionText>{bookStatusMap[status]}</OptionText>
            }></CheckCircle>
        ))}
      </div>
      <Button
        text='완료'
        onClick={handleSelectStatus}
        variant={bookStatus ? 'primary' : 'disabled'}
      />
      <HelpText>{HELP_MESSAGES.state}</HelpText>
    </StatusSection>
  );
};

export default SelectBookStatus;

const HelpText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_700};
  white-space: pre-line;
`;

const StatusSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const OptionText = styled.div`
  margin: 0 5px;
`;
