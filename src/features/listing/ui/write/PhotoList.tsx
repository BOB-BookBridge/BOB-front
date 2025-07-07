import styled, { useTheme } from 'styled-components';
import { CloseIconSm, PhotoIcon } from '@/shared/assets/icons';
import { useUploadImagesMutation } from '@/entities/files';
import { ImageFile } from '@/entities/files';
import * as S from './ListingWrite.styles';

interface PhotoListProps {
  images: ImageFile[];
  onAddImage: (image: ImageFile) => void;
  onDeleteImage: (idx: number) => void;
}
const PhotoList = ({ images, onAddImage, onDeleteImage }: PhotoListProps) => {
  const theme = useTheme();

  const { mutate: uploadImage } = useUploadImagesMutation();

  function handleAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;
    if (images.length + files.length > 5) {
      alert('최대 5장까지 업로드 할 수 있어요');
      return;
    }
    const fileArray = Array.from(files);
    uploadImage(
      { domain: 'POST', images: fileArray },
      {
        onSuccess: (uploadedImages) => {
          uploadedImages
            .sort((a, b) => a.sequence - b.sequence)
            .forEach((image) => onAddImage(image));
        },
      },
    );
  }

  function handleDeleteImage(idx: number) {
    onDeleteImage(idx);
  }

  return (
    <Container>
      <S.AddPhoto>
        <input
          onChange={handleAddImage}
          type='file'
          multiple
          style={{ display: 'none' }}
        />
        <PhotoIcon fill={theme.colors.GRAY_500} />
        <div style={{ color: theme.colors.GRAY_500 }}>{images.length}/5</div>
      </S.AddPhoto>
      {images.map((image, idx) => (
        <div
          key={image.fileName}
          style={{ flexShrink: 0, position: 'relative' }}>
          <S.DeleteButton onClick={() => handleDeleteImage(idx)}>
            <CloseIconSm fill={theme.colors.WHITE} />
          </S.DeleteButton>
          <S.StyledImage src={image.fileUrl} draggable={false} />
        </div>
      ))}
    </Container>
  );
};

export default PhotoList;

const Container = styled.div`
  width: 100%;
  overflow-x: scroll;
  display: flex;
  gap: 10px;
`;
