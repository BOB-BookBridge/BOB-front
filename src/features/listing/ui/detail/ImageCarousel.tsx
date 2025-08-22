import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import * as S from './ListingDetail.styles';
import { useState } from 'react';
import ModalCarousel from './ModalCarousel';
import { DetailImage } from '@/entities/listing';

interface ImageCarouselProps {
  images?: DetailImage[];
  thumbnail?: string;
}

const ImageCarousel = ({ images, thumbnail }: ImageCarouselProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <S.SwiperWrapper>
      <Swiper
        style={{ width: '100%' }}
        modules={[Navigation]}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        speed={400}
        slidesPerView={1}>
        {images
          ? images.map((image, idx) => (
              <SwiperSlide key={idx}>
                <img
                  alt='등록된 책 사진'
                  onClick={() => {
                    setSelectedIndex(idx);
                    setIsModalOpen(true);
                  }}
                  src={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${image.fileName}`}
                />
              </SwiperSlide>
            ))
          : thumbnail && (
              <SwiperSlide>
                <img
                  alt='책 썸네일'
                  onClick={() => {
                    setSelectedIndex(0);
                    setIsModalOpen(true);
                  }}
                  src={thumbnail}
                />
              </SwiperSlide>
            )}
      </Swiper>
      <div className='swiper-button-prev' />
      <div className='swiper-button-next' />
      {images && isModalOpen && (
        <ModalCarousel
          images={images}
          initialIndex={selectedIndex}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </S.SwiperWrapper>
  );
};

export default ImageCarousel;
