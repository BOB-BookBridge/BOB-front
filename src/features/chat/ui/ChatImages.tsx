import { useState } from 'react';
import styled from 'styled-components';
import ModalCarousel from '@/features/listing/ui/detail/ModalCarousel';
import { DetailImage } from '@/entities/listing';
import { colors } from '@/shared/constants';
import * as S from './ChatRoom.styles';

const ChatImages = ({ images }: { images: DetailImage[] }) => {
  const sortedImages = [...images].sort((a, b) => a.sequence - b.sequence);

  const topImages = images.length > 3 ? sortedImages.slice(0, 3) : sortedImages;
  const restCount = images.length > 3 ? images.length - 3 : 0;
  const [isOpen, setIsOpen] = useState(false);
  function handleShowAllImages() {
    setIsOpen(true);
  }
  return (
    <Container>
      <S.ImageGrid onClick={handleShowAllImages}>
        {topImages.map((img, idx) => (
          <div key={img.sequence} style={{ position: 'relative' }}>
            <S.ImageThumbnail src={img.fileName} />
            {idx === 2 && (
              <S.ImageOverlay>
                <S.OverlayText>+{restCount}</S.OverlayText>
              </S.ImageOverlay>
            )}
          </div>
        ))}
      </S.ImageGrid>
      {isOpen && (
        <ModalCarousel
          images={images}
          initialIndex={0}
          onClose={() => setIsOpen(false)}
        />
      )}
    </Container>
  );
};
export default ChatImages;

export const Container = styled.div`
  position: relative;
  max-width: 60%;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    z-index: ${({ theme }) => theme.zIndex.button};
    color: ${colors.light.WHITE};

    &::after {
      font-size: 16px;
      color: ${colors.light.WHITE};
    }
  }

  .swiper-button-prev {
    left: 16px;
  }

  .swiper-button-next {
    right: 16px;
  }
`;
