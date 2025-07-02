import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SearchIcon } from '@/shared/assets/icons';
import * as S from './ListingWrite.styles';
import { Button } from '@/shared/ui';
import { searchBook } from '@/entities/aladin';
import { AladinItemType } from '@/entities/aladin/type';
import { useWriteStore } from '../../model/useWriteStore';
import { formatDate } from '@/shared/lib';

interface SearchModalContentProps {
  value: string;
  onClose: () => void;
}

const SearchModalContent = ({ value, onClose }: SearchModalContentProps) => {
  const [newValue, setNewValue] = useState(value);
  const [selected, setSelected] = useState<AladinItemType | null>(null);
  const [result, setResult] = useState<AladinItemType[] | null>();
  const { setBook } = useWriteStore();
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (newValue) {
        searchBook(newValue).then((data) => {
          setResult(data.item);
        });
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [newValue]);

  function handleClickBook(value: AladinItemType) {
    setSelected(value);
  }

  function handleNewValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewValue(e.target.value);
  }
  function handleChooseBook() {
    if (selected) {
      const {
        isbn13: isbn,
        title,
        author,
        description,
        priceStandard,
        cover: originCover,
        pubDate: originPubDate,
      } = selected;
      const cover = originCover.replace(/cover[^/]+/, 'cover500');
      const pubDate = formatDate(originPubDate);

      setBook({
        isbn,
        title,
        author,
        description,
        priceStandard,
        cover,
        pubDate,
      });
      onClose();
    }
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
        {result && result.length > 0 ? (
          result.map((item) => (
            <BookItemWrapper
              key={item.itemId}
              onClick={() => handleClickBook(item)}
              $isSelected={selected?.itemId === item.itemId}>
              <BookImage src={item.cover} />
              <div style={{ width: '100%' }}>
                <TitleText>{item.title}</TitleText>
                <InfoText>{item.author}</InfoText>
                <InfoText>{item.pubDate}</InfoText>
              </div>
            </BookItemWrapper>
          ))
        ) : (
          <EmptyMessage>검색 결과가 없습니다.</EmptyMessage>
        )}
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

const EmptyMessage = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px 0;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;
