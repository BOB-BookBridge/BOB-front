import { useState } from 'react';
import styled from 'styled-components';
import { Button, CheckCircle, ModalLayout } from '@/shared/ui';
import { bookStatusList } from '@/features/listing/ui/main/filter/FilterContent';
import { BookState, BookStatus } from '@/entities/listing';
import { SearchModalContent } from '@/features/search/ui';
import { HELP_MESSAGES } from '@/shared/constants';
import { Book, Bookcase } from '@/entities/user';
import { bookStatusMap } from '@/shared/lib';
import AddBookItem from './AddBookItem';
import BookItem from './BookItem';

type Modal = 'STATUS' | 'ADD';
const BookShelfSection = ({
  books,
  type,
}: {
  books: Book[] | Bookcase[];
  type: 'bookcase' | 'wish';
}) => {
  const [editMode, setEditMode] = useState(false);
  const [activeModal, setActiveModal] = useState<Modal | undefined>();
  const [bookStatus, setBookStatus] = useState<BookStatus | undefined>();

  function handleEditMode() {
    setEditMode((prev) => !prev);
  }

  function handleClickAdd() {
    console.log('add');
    setActiveModal('ADD');
  }

  function handleReset() {
    setBookStatus(undefined);
    setActiveModal(undefined);
  }

  function handleSelectAddBook(book: BookState) {
    console.log(book);
    if (type === 'bookcase') {
      console.log('status');
      setActiveModal('STATUS');
    } else handleReset();
  }

  function handleSelectBookStatus() {
    console.log(bookStatus);
    setActiveModal(undefined);
    handleReset();
  }
  return (
    <Container>
      <EditMode
        onClick={handleEditMode}
        $hasHelpText={type === 'bookcase' && editMode}>
        {type === 'bookcase' && editMode && (
          <HelpText>
            *거래에 이용 중인 책은 거래가 완료 시 자동으로 삭제됩니다
          </HelpText>
        )}
        <EditButton $editMode={editMode}>
          {editMode ? '완료' : '편집'}
        </EditButton>
      </EditMode>
      <BookList>
        {books.map((book) => (
          <BookItem key={book.id} book={book} editMode={editMode} />
        ))}
        <AddBookItem onClick={handleClickAdd} />
      </BookList>
      {activeModal &&
        (activeModal === 'ADD' ? (
          <ModalLayout
            isOpen={activeModal === 'ADD'}
            onClose={handleReset}
            title='책 조회하기'>
            <SearchModalContent
              onClose={handleReset}
              onSelectBook={handleSelectAddBook}
            />
          </ModalLayout>
        ) : (
          <ModalLayout
            isOpen={activeModal === 'STATUS'}
            onClose={handleReset}
            title='책 상태 입력'>
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
                onClick={handleSelectBookStatus}
                variant={bookStatus ? 'primary' : 'disabled'}
              />
              <HelpText>{HELP_MESSAGES.state}</HelpText>
            </StatusSection>
          </ModalLayout>
        ))}
    </Container>
  );
};

export default BookShelfSection;

const Container = styled.div`
  width: 100%;
`;

const BookList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 8px;
`;

const EditMode = styled.div<{ $hasHelpText: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $hasHelpText }) =>
    $hasHelpText ? 'space-between' : 'flex-end'};
  align-items: center;
  padding: 0 8px;
`;

const HelpText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_700};
  white-space: pre-line;
`;

const EditButton = styled.div<{ $editMode: boolean }>`
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${({ theme, $editMode }) =>
    $editMode ? theme.colors.PRIMARY : 'none'};

  color: ${({ theme, $editMode }) =>
    $editMode ? theme.colors.WHITE : theme.colors.BLACK};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 12px;
  }
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
