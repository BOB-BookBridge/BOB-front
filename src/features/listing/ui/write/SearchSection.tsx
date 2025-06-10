import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import SearchModalContent from './SearchModalContent';
import { ArrowIConLg } from '@/shared/assets/icons';
import { HELP_MESSAGES } from '@/shared/constants';
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

  function handleSearchBook() {
    if (value.length == 0) return;
    setIsOpen(true);
  }
  function handleEnterEvent(e: React.KeyboardEvent) {
    if (e.keyCode == 13) handleSearchBook();
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
          <SearchModalContent value={value} onClose={() => setIsOpen(false)} />
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
