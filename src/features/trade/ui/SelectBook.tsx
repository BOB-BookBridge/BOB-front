import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { bookStatusMap } from '@/shared/lib';
import { Bookcase } from '@/entities/user';
import { Button } from '@/shared/ui';

const SelectBook = ({
  books,
  onTradeRequest,
}: {
  books: Bookcase[];
  onTradeRequest: (selected: Bookcase[]) => void;
}) => {
  const [selected, setSelected] = useState<Bookcase[]>([]);

  function handleClickItem(book: Bookcase) {
    setSelected((prev) => {
      const exists = prev.find((b) => b.id === book.id);
      if (exists) {
        return prev.filter((b) => b.id !== book.id);
      } else {
        return [...prev, book];
      }
    });
  }

  return (
    <Container>
      <BookList>
        {books.map((book) => (
          <ItemWrapper
            key={book.id}
            $isSelected={!!selected.find((b) => b.id === book.id)}
            onClick={() => handleClickItem(book)}>
            <ImageWrapper>
              <Image
                src={book.cover}
                alt={book.title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </ImageWrapper>
            <BookInfo>
              <TitleText>{book.title}</TitleText>
              <InfoText>{`${book.author} | ${bookStatusMap[book.status]}`}</InfoText>
            </BookInfo>
          </ItemWrapper>
        ))}
      </BookList>
      <SelectedBook>
        {selected.map((book) => (
          <SelectedBookTitle key={book.id}>{book.title}</SelectedBookTitle>
        ))}
      </SelectedBook>
      <Footer>
        <InfoText>⚠️ 이전 신청과 같은 조합으로는 신청이 불가능합니다</InfoText>
        <div style={{ width: '25%' }}>
          <Button
            text='교환 신청'
            onClick={() => onTradeRequest(selected)}
            size='sm'
          />
        </div>
      </Footer>
    </Container>
  );
};

export default SelectBook;

const Container = styled.div`
  padding: 10px;
`;

const BookList = styled.div`
  max-height: 280px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ItemWrapper = styled.div<{ $isSelected: boolean }>`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  ${({ $isSelected, theme }) =>
    $isSelected &&
    `
  background-color: ${theme.colors.PRIMARY_100};
  border: 1.5px solid ${theme.colors.PRIMARY};
  `}
  cursor: pointer;
  border-radius: 12px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 10%;
  aspect-ratio: 1 / 1;
  flex: none;
  border-radius: 8px;
  overflow: hidden;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleText = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const InfoText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_500};
`;

const SelectedBook = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  gap: 6px;
`;

const SelectedBookTitle = styled.div`
  display: inline-flex;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
`;

const Footer = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
