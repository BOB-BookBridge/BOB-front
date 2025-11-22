import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { Button, ModalLayout } from '@/shared/ui';
import { bookStatusMap } from '@/shared/lib';
import CloseButton from './CloseButton';
import {
  Book,
  Bookcase,
  useDeleteWishesItemMutation,
  useDeleteBookcaseItemMutation,
} from '@/entities/user';

const BookItem = ({
  book,
  editMode,
  type,
}: {
  book: Bookcase | Book;
  editMode: boolean;
  type?: 'BOOKCASE' | 'WISH';
}) => {
  const [activeModal, setActiveModal] = useState(false);
  const { mutate: deleteBookcaseItem } = useDeleteBookcaseItemMutation();
  const { mutate: deleteWishItem } = useDeleteWishesItemMutation();

  function handleClickClose() {
    setActiveModal(true);
  }

  function handleDelteItem() {
    if (!type) return;
    if (type === 'BOOKCASE') deleteBookcaseItem(book.id);
    else if (type === 'WISH') deleteWishItem(book.id);
    setActiveModal(false);
  }

  function handleReset() {
    setActiveModal(false);
  }
  return (
    <>
      <Container>
        {editMode &&
          (!('available' in book) ||
            ('available' in book && book.available)) && (
            <CloseButton onClick={handleClickClose} />
          )}
        <ImageWrapper>
          {'available' in book && !book.available && (
            <Overlay>
              <OverlayText>{`거래에\n이용 중`}</OverlayText>
            </Overlay>
          )}
          <Image
            src={book.cover}
            alt={book.title}
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </ImageWrapper>
        <Title $available={'available' in book ? book.available : undefined}>
          {book.title}
        </Title>
        <Meta>
          {book.author} {'status' in book && ` | ${bookStatusMap[book.status]}`}
        </Meta>
      </Container>
      {activeModal && (
        <ModalLayout
          isOpen={activeModal}
          onClose={() => setActiveModal(false)}
          title={book.title}>
          <DeleteModal>
            <ModalText>해당 도서를 삭제하시겠습니까?</ModalText>
            <ButtonWrapper>
              <div style={{ width: '25%' }}>
                <Button
                  variant='cancel'
                  text='취소'
                  size='sm'
                  onClick={handleReset}
                />
              </div>
              <div style={{ width: '40%' }}>
                <Button
                  variant='primary'
                  text='삭제'
                  size='sm'
                  onClick={handleDelteItem}
                />
              </div>
            </ButtonWrapper>
          </DeleteModal>
        </ModalLayout>
      )}
    </>
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
  white-space: pre-wrap;
  text-align: center;
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

const DeleteModal = styled.div`
  position: relative;
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
`;

const ModalText = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 70%;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;
