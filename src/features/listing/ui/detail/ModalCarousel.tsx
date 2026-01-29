import Image from 'next/image';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CloseIcon } from '@/shared/assets/icons';
import { DetailImage } from '@/entities/listing';
import { colors } from '@/shared/constants';

import 'swiper/css';
import 'swiper/css/navigation';

interface ModalCarouselProps {
  images: DetailImage[];
  initialIndex: number;
  onClose: () => void;
}

const ModalCarousel = ({
  images,
  initialIndex,
  onClose,
}: ModalCarouselProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <ModalOverlay>
      <CloseButton onClick={onClose}>
        <CloseIcon fill={colors.light.WHITE} />
      </CloseButton>
      <ModalContent>
        <Swiper
          initialSlide={initialIndex}
          slidesPerView={1}
          navigation
          modules={[Navigation]}>
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <ImageWrapper>
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${img.fileName}`}
                  fill
                  alt={`Image ${idx + 1}`}
                  style={{ objectFit: 'cover' }}
                />
              </ImageWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalCarousel;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: ${({ theme }) => theme.zIndex.overlay};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

export const ModalContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
