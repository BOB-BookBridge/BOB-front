'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { LoadingContainer } from '@/shared/ui/LoadingIndicator';
import { cleanHtmlText, formatDate } from '@/shared/lib';
import { AladinItemType } from '@/entities/aladin/type';
import { LoadingIndicator, Button } from '@/shared/ui';
import { SearchIcon } from '@/shared/assets/icons';
import { BookState } from '@/entities/listing';
import { searchBook } from '@/entities/aladin';

interface SearchModalContentProps {
  value?: string;
  onClose?: () => void;
  onSelectBook: (book: BookState) => void;
}

const SearchModalContent = ({
  value,
  onClose,
  onSelectBook,
}: SearchModalContentProps) => {
  const [newValue, setNewValue] = useState(value);
  const [selected, setSelected] = useState<AladinItemType | null>(null);
  const [result, setResult] = useState<AladinItemType[] | null>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!newValue || newValue.trim().length === 0) {
      setIsLoading(false);
      setResult(null);
      return;
    }
    setSelected(null);
    setIsLoading(true);
    const debounce = setTimeout(() => {
      if (newValue) {
        searchBook(newValue).then((data) => {
          setResult(data.item);
          setIsLoading(false);
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
  function cleanDescription(input: string): string {
    const cleaned = input.replace(/<img[^>]*>.*?<br\s*\/?>/i, '');

    return cleanHtmlText(cleaned);
  }
  function handleChooseBook() {
    if (selected) {
      const {
        isbn13: isbn,
        title: originTitle,
        author,
        description: originDesc,
        priceStandard: originPrice,
        cover: originCover,
        pubDate: originPubDate,
      } = selected;
      const title = cleanHtmlText(originTitle);
      const description = cleanDescription(originDesc);
      const priceStandard = Number(originPrice);
      const cover = originCover.replace(/cover[^/]+/, 'cover500');
      const pubDate = formatDate(originPubDate);

      onSelectBook({
        isbn,
        title,
        author,
        description,
        priceStandard,
        cover,
        pubDate,
      });
    }
  }
  return (
    <ModalContent>
      <SearchBarWrapper>
        <SearchIcon />
        <Input
          value={newValue || ''}
          type='text'
          placeholder='책 제목이나 ISBN을 입력해 주세요'
          onChange={handleNewValueChange}
        />
      </SearchBarWrapper>
      {isLoading ? (
        <LoadingContainer>
          <LoadingIndicator text='찾는중...' />
        </LoadingContainer>
      ) : result && result.length > 0 ? (
        <BookListWrapper>
          {result.map((item) => (
            <BookItemWrapper
              key={item.itemId}
              onClick={() => handleClickBook(item)}
              $isSelected={selected?.itemId === item.itemId}>
              <BookImage src={item.cover} />
              <div style={{ flex: 1 }}>
                <TitleText>{item.title}</TitleText>
                <InfoText>{item.author}</InfoText>
                <InfoText>{formatDate(item.pubDate)} 발행</InfoText>
              </div>
            </BookItemWrapper>
          ))}
        </BookListWrapper>
      ) : !newValue ? (
        <EmptyMessage>검색어를 입력해 주세요</EmptyMessage>
      ) : (
        <EmptyMessage>검색 결과가 없습니다</EmptyMessage>
      )}
      <ButtonWrapper>
        <Button
          text='선택 완료'
          variant={selected ? 'primary' : 'disabled'}
          onClick={handleChooseBook}
        />
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
  align-items: flex-start;
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
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 10px;
`;

const TitleText = styled.div`
  font-size: 14px;
`;

const InfoText = styled.div`
  color: ${({ theme }) => theme.colors.GRAY_600};
  font-size: 11px;
`;

const EmptyMessage = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px 0;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;

export const Input = styled.input`
  width: 100%;
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: transparent;
  caret-color: ${({ theme }) => theme.colors.BLACK};

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_500};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.BLACK};
    -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.WHITE}
      inset;
    box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.WHITE} inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`;
