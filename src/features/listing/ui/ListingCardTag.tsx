import styled from 'styled-components';
import { colors } from '../../../shared/constants';
import { bookStatusMap } from '@/shared/lib';

const ListingCardTag = ({
  status,
}: {
  status: 'BEST' | 'HIGH' | 'MEDIUM' | 'LOW';
}) => {
  const text = bookStatusMap[status];
  return <Container status={status}>#{text}</Container>;
};

export default ListingCardTag;

interface TagProps {
  status: 'BEST' | 'HIGH' | 'MEDIUM' | 'LOW';
}
const Container = styled.div<TagProps>`
  background-color: ${({ status }) => colors.light.BOOK_STATUS[status]};
  padding: 3px 5px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  color: ${colors.light.WHITE};
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;
