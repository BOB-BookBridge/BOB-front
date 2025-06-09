import { PhotoIcon } from '@/shared/assets/icons';
import styled, { useTheme } from 'styled-components';

const PhotoList = () => {
  const theme = useTheme();
  return (
    <Container>
      <AddPhoto>
        <PhotoIcon fill={theme.colors.GRAY_500} />
        <div style={{ color: theme.colors.GRAY_500 }}>0/5</div>
      </AddPhoto>
    </Container>
  );
};

export default PhotoList;

const Container = styled.div`
  width: 100%;
`;

const AddPhoto = styled.div`
  border: 1.5px solid ${({ theme }) => theme.colors.GRAY_500};
  border-radius: 20px;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
