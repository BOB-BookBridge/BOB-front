import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useWriteStore } from '../../model/useWriteStore';
import { SearchModalContent } from '@/features/search/ui';
import { ArrowIConLg } from '@/shared/assets/icons';
import { HELP_MESSAGES } from '@/shared/constants';
import { BookModel } from '@/entities/listing';
import * as S from './ListingWrite.styles';
import { ModalLayout } from '@/shared/ui';
import HelpButton from './HelpButton';

interface SearchSectionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchSection = ({ value, onChange }: SearchSectionProps) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { setBook } = useWriteStore();

  function handleSearchBook() {
    if (value.length == 0) return;
    setIsOpen(true);
  }

  function handleEnterEvent(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSearchBook();
  }

  function handleSelectBook(book: BookModel) {
    setBook(book);
    setIsOpen(false);
  }

  return (
    <Container>
      <S.HeaderWrapper>
        <S.HeaderText>책 조회</S.HeaderText>
        <HelpButton text={HELP_MESSAGES.search} />
      </S.HeaderWrapper>
      <S.InputWrapper>
        <S.Input
          value={value}
          type='text'
          placeholder='책 제목이나 ISBN을 입력해 주세요'
          onChange={onChange}
          onKeyDown={handleEnterEvent}
        />
        <S.EnterButton onClick={handleSearchBook}>
          <ArrowIConLg fill={theme.colors.GRAY_800} />
        </S.EnterButton>
      </S.InputWrapper>
      {isOpen && (
        <ModalLayout
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title='책 조회하기'>
          <SearchModalContent
            value={value}
            onClose={() => setIsOpen(false)}
            onSelectBook={handleSelectBook}
          />
        </ModalLayout>
      )}
    </Container>
  );
};

export default SearchSection;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
