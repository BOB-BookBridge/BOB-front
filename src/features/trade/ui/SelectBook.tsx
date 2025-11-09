import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { bookStatusMap } from '@/shared/lib';
import { Bookcase } from '@/entities/user';
import { Button } from '@/shared/ui';

const bookcase: Bookcase[] = [
  {
    id: 13,
    status: 'BEST',
    title: '파쇄',
    author: '구병모 지음',
    cover:
      'https://image.aladin.co.kr/product/31273/29/cover500/k592832565_1.jpg',
    available: true,
  },
  {
    id: 15,
    status: 'HIGH',
    title: '안녕! 보노보노 컬러링 엽서북 - 애니메이션 원화로 그리는',
    author: '미르북컴퍼니 편집부 지음',
    cover:
      'https://image.aladin.co.kr/product/34116/30/cover500/k712931484_1.jpg',
    available: true,
  },
];

const SelectBook = () => {
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

  function handleClickTradeRequest() {
    console.log('request');
  }
  return (
    <Container>
      <BookList>
        {bookcase.map((book) => (
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
            onClick={handleClickTradeRequest}
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
