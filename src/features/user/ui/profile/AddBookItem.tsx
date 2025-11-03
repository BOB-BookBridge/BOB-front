import { AddBook } from '@/shared/assets/icons';
import styled from 'styled-components';

const AddBookItem = () => {
  return (
    <Container>
      <BoxWrapper>
        <AddBook />
        <Text>등록</Text>
      </BoxWrapper>
    </Container>
  );
};

export default AddBookItem;

const Container = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 20%;
  }
`;

const BoxWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  border: 2px dashed ${({ theme }) => theme.colors.GRAY_400};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.GRAY_700};
  cursor: pointer;

  svg {
    stroke: currentColor;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_200};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Text = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;
