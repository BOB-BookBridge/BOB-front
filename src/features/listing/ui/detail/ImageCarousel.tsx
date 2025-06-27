import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import * as S from './ListingDetail.styles';
import { useState } from 'react';
import ModalCarousel from './ModalCarousel';
import { DetailImage } from '@/entities/listing';

interface ImageCarouselProps {
  images: DetailImage[];
}
// #todo: img 태그 -> Image로 변경
// 이미지 도메인 s3.~~~ 맞는지 확인
const ImageCarousel = ({ images }: ImageCarouselProps) => {
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
        {images.map((image) => (
          <SwiperSlide key={image.sequence}>
            <img
              alt='등록된 책 사진'
              onClick={() => {
                setSelectedIndex(image.sequence);
                setIsModalOpen(true);
              }}
              src={image.fileName}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='swiper-button-prev' />
      <div className='swiper-button-next' />
      {isModalOpen && (
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
