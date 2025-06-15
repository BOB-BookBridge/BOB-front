import { useState } from 'react';
import styled from 'styled-components';
import { SearchIcon } from '@/shared/assets/icons';
import { data } from '@/mocks/mockBookSearch';
import * as S from './ListingWrite.styles';
import { Button } from '@/shared/ui';

interface SearchModalContentProps {
  value: string;
  onClose: () => void;
}
// #todo: 판매 정보 zustand로 관리
const SearchModalContent = ({ value, onClose }: SearchModalContentProps) => {
  const [newValue, setNewValue] = useState(value);
  const [selectId, setSelectId] = useState<number | null>(null);

  function handleClickBook(value: number) {
    setSelectId(value);
  }

  function handleNewValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewValue(e.target.value);
  }
  function handleChooseBook() {
    onClose();
  }
  return (
    <ModalContent>
      <SearchBarWrapper>
        <SearchIcon />
        <S.Input
          value={newValue}
          type='text'
          placeholder='책 제목이나 ISBN을 입력해 주세요'
          onChange={handleNewValueChange}
        />
      </SearchBarWrapper>
      <BookListWrapper>
        {data.item.map((item, idx) => (
          <BookItemWrapper
            key={item.itemId}
            onClick={() => handleClickBook(item.itemId)}
            $isSelected={selectId === item.itemId}>
            <BookImage src={item.cover} />
            <div style={{ width: '100%' }}>
              <TitleText>{item.title}</TitleText>
              <InfoText>{item.author}</InfoText>
              <InfoText>{item.pubDate}</InfoText>
            </div>
          </BookItemWrapper>
        ))}
      </BookListWrapper>
      <ButtonWrapper>
        <Button text='선택 완료' variant='primary' onClick={handleChooseBook} />
      </ButtonWrapper>
    </ModalContent>
  );
};

export default SearchModalContent;

const BookListWrapper = styled.div`
  width: 100%;
  max-height: 350px;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 744px) {
    grid-template-columns: 1fr;
  }
`;

const ModalContent = styled.div`
  width: 100%;
`;

const SearchBarWrapper = styled.div`
  padding: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.button};
`;

interface BookItemWrapperProps {
  $isSelected: boolean;
}
const BookItemWrapper = styled.div<BookItemWrapperProps>`
  display: flex;
  gap: 10px;
  margin: 10px 5px;
  border-radius: 10px;
  padding: 10px;
  flex-shrink: 0;
  cursor: pointer;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.PRIMARY_100 : 'none'};
  border: ${({ $isSelected, theme }) =>
    $isSelected ? `2px solid ${theme.colors.PRIMARY}` : 'none'};
`;

const BookImage = styled.img`
  width: 80px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 10px;
`;

const InfoText = styled.div`
  color: ${({ theme }) => theme.colors.GRAY_600};
  font-size: 12px;
`;

const TitleText = styled.div``;
