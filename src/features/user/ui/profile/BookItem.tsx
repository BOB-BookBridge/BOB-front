import Image from 'next/image';
import styled from 'styled-components';
import { Bookcase, Book } from '@/entities/user';
import { bookStatusMap } from '@/shared/lib';
import CloseButton from './CloseButton';

const BookItem = ({
  book,
  editMode,
}: {
  book: Bookcase | Book;
  editMode: boolean;
}) => {
  return (
    <Container>
      {editMode && <CloseButton handleClick={() => console.log('click')} />}
      <ImageWrapper>
        {'available' in book && !book.available && (
          <Overlay>
            <OverlayText>거래에 이용 중</OverlayText>
          </Overlay>
        )}
        <Image
          src={book.cover}
          alt={book.title}
          fill
          style={{ objectFit: 'cover' }}
        />
      </ImageWrapper>
      <Title $available={'available' in book ? book.available : undefined}>
        {book.title}
      </Title>
      <Meta>
        {book.author} {'status' in book && ` | ${bookStatusMap[book.status]}`}
      </Meta>
    </Container>
  );
};

export default BookItem;

const Container = styled.div`
  position: relative;
  width: 15%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 20%;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  flex: none;
  border-radius: 12px;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  padding: 8px;
`;

const OverlayText = styled.div`
  color: #fafafa;
  font-weight: 600;
  font-size: 12px;
`;

const Title = styled.div<{ $available?: boolean }>`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme, $available = true }) =>
    $available ? theme.colors.BLACK : theme.colors.GRAY_500};
`;

const Meta = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_500};
`;
