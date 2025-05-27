import styled from 'styled-components';
import { colors } from '../constants';

const ListingCardTag = ({
  text,
  type,
}: {
  text: string;
  type: 'CATEGORY' | 'STATUS';
}) => {
  return <Container type={type}>#{text}</Container>;
};

export default ListingCardTag;

interface TagProps {
  type: 'CATEGORY' | 'STATUS';
}
const Container = styled.div<TagProps>`
  background-color: ${({ type }) =>
    type === 'CATEGORY' ? colors.light.SECONDARY : colors.light.PRIMARY};
  padding: 3px 5px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.light.WHITE};
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
