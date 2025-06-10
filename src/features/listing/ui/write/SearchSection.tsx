import styled, { useTheme } from 'styled-components';
import { ArrowIConLg } from '@/shared/assets/icons';
import * as S from './ListingWrite.styles';
import HelpButton from './HelpButton';
import { HELP_MESSAGES } from '@/shared/constants';

interface SearchSectionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchSection = ({ value, onChange }: SearchSectionProps) => {
  const theme = useTheme();

  return (
    <Container>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <S.HeaderText>책 조회</S.HeaderText>
        <HelpButton text={HELP_MESSAGES.search} />
      </div>
      <S.InputWrapper>
        <S.Input
          value={value}
          type='text'
          placeholder='책 제목이나 ISBN을 입력해 주세요'
          onChange={onChange}
        />
        <S.EnterButton>
          <ArrowIConLg fill={theme.colors.GRAY_800} />
        </S.EnterButton>
      </S.InputWrapper>
    </Container>
  );
};

export default SearchSection;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
