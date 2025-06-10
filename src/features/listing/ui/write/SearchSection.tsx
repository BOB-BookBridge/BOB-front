import styled, { useTheme } from 'styled-components';
import { ArrowIConLg } from '@/shared/assets/icons';
import * as S from './ListingWrite.styles';
import HelpButton from './HelpButton';

interface SearchSectionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SEARCH_HELP_MESSAGE = `ISBN은 국제표준 도서번호를 말하는 것으로 각 도서 뒷편 바코드 위치에 10 or 13자리 숫자로 표기되어 있습니다.\n\n책 제목을 검색하실 때는 띄어쓰기를 해주셔야 합니다. 정확한 검색을 원하신다면 ISBN을 입력해 주세요.`;
const SearchSection = ({ value, onChange }: SearchSectionProps) => {
  const theme = useTheme();

  return (
    <Container>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <S.HeaderText>책 조회</S.HeaderText>
        <HelpButton text={SEARCH_HELP_MESSAGE} />
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
