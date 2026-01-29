import styled, { useTheme } from 'styled-components';
import { CloseIconSm, PhotoIcon } from '@/shared/assets/icons';
import { useUploadImagesMutation } from '@/entities/files';
import { ImageFile } from '@/entities/files';
import * as S from './ListingWrite.styles';
import Image from 'next/image';

interface PhotoListProps {
  images: ImageFile[];
  onAddImage: (image: ImageFile) => void;
  onDeleteImage: (idx: number) => void;
}
const PhotoList = ({ images, onAddImage, onDeleteImage }: PhotoListProps) => {
  const theme = useTheme();

  const { mutate: uploadImage } = useUploadImagesMutation();

  function handleAddImage(e: React.ChangeEvent<HTMLInputElement>) {
    const inputEl = e.currentTarget;
    const files = inputEl.files;

    if (!files || files.length === 0) return;
    if (images.length + files.length > 5) {
      alert('최대 5장까지 업로드 할 수 있어요');
      return;
    }
    const fileArray = Array.from(files);
    uploadImage(
      { domain: 'POST', images: fileArray },
      {
        onSuccess: (uploadedImages) => {
          uploadedImages.forEach((image) => onAddImage(image));
          inputEl.value = '';
        },
        onError: () => {
          inputEl.value = '';
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
          <S.ImageWrapper>
            <Image
              src={
                image.fileUrl
                  ? image.fileUrl
                  : `${process.env.NEXT_PUBLIC_S3_BASE_URL}/${image.fileName}`
              }
              alt='이미지'
              fill
              style={{ objectFit: 'cover' }}
              draggable={false}
            />
          </S.ImageWrapper>
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
