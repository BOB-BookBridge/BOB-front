import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Section = styled.div``;

export const TradeStatusWrapper = styled.div`
  padding: 10px 15px;
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 15px;
`;
export const BookStatusWrapper = styled.div`
  display: flex;
  gap: 8px;
  padding: 10px 15px;
`;
export const PriceWrapper = styled.div`
  padding: 10px 15px;
`;

export const TitleText = styled.span`
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
`;

export const OptionText = styled.p`
  margin: 0 5px;
`;

export const PriceRange = styled.div<{ $isChecked: boolean }>`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  margin: 5px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_500};
  background-color: ${({ $isChecked, theme }) =>
    $isChecked ? theme.colors.BLACK : theme.colors.WHITE};
  color: ${({ $isChecked, theme }) =>
    $isChecked ? theme.colors.WHITE : theme.colors.BLACK};
`;
