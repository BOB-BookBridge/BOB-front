import styled from 'styled-components';
import * as S from './ListingWrite.styles';

interface PriceAndCategoryProps {
  price: string;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categoryId?: number;
  handleCategoryChange?: () => void;
}
const PriceAndCategory = ({
  price,
  handlePriceChange,
  categoryId,
  handleCategoryChange,
}: PriceAndCategoryProps) => {
  return (
    <Container>
      <S.InputWrapper style={{ flex: 1 }}>
        <span style={{ marginRight: 5 }}>₩</span>
        <S.Input
          type='text'
          value={price}
          onChange={handlePriceChange}
          inputMode='numeric'
          placeholder='가격을 입력하세요'
        />
      </S.InputWrapper>
      <S.InputWrapper style={{ flex: 0.5 }}></S.InputWrapper>
    </Container>
  );
};

export default PriceAndCategory;

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;
