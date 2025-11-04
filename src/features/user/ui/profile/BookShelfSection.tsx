import { useState } from 'react';
import styled from 'styled-components';
import { Book, Bookcase } from '@/entities/user';
import AddBookItem from './AddBookItem';
import BookItem from './BookItem';

const BookShelfSection = ({
  books,
  type,
}: {
  books: Book[] | Bookcase[];
  type: 'bookcase' | 'wish';
}) => {
  const [editMode, setEditMode] = useState(false);

  function handleEditMode() {
    setEditMode((prev) => !prev);
  }
  return (
    <Container>
      <EditMode
        onClick={handleEditMode}
        $hasHelpText={type === 'bookcase' && editMode}>
        {type === 'bookcase' && editMode && (
          <EditHelpText>
            *거래에 이용 중인 책은 거래가 완료 시 자동으로 삭제됩니다
          </EditHelpText>
        )}
        <Button $editMode={editMode}>{editMode ? '완료' : '편집'}</Button>
      </EditMode>
      <BookList>
        {books.map((book) => (
          <BookItem key={book.id} book={book} editMode={editMode} />
        ))}
        <AddBookItem />
      </BookList>
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

const EditHelpText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;

const Button = styled.div<{ $editMode: boolean }>`
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
