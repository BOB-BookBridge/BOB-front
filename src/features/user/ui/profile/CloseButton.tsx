import styled from 'styled-components';
import { CloseIconSm, CloseIconXs } from '@/shared/assets/icons';
const CloseButton = ({
  onClick,
  size,
}: {
  onClick: () => void;
  size?: 'xs' | 'default';
}) => {
  return (
    <Container onClick={onClick}>
      <Button>{size === 'xs' ? <CloseIconXs /> : <CloseIconSm />}</Button>
    </Container>
  );
};

export default CloseButton;

const Container = styled.div`
  position: absolute;
  top: -12px;
  right: -12px;
  padding: 8px;
  cursor: pointer;
  z-index: ${({ theme }) => theme.zIndex.button};
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px ${({ theme }) => theme.colors.GRAY_500} solid;
  border-radius: 50%;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.colors.GRAY_700};
  }
`;
