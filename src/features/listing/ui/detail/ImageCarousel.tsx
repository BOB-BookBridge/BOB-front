import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import * as S from './ListingDetail.styles';

interface ImageCarouselProps {
  images: string[];
}
// #todo: img 태그 -> Image로 변경
// 이미지 도메인 s3.~~~ 맞는지 확인
const ImageCarousel = ({ images }: ImageCarouselProps) => {
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
        {images.map((image, idx) => (
          <SwiperSlide key={idx + image}>
            <img
              alt='등록된 책 사진'
              src='https://cdn.eyesmag.com/content/uploads/posts/2025/01/22/shutterstock_2491179401-06f50759-c2c5-49cb-b10b-ba47ca6d2166.jpg'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='swiper-button-prev' />
      <div className='swiper-button-next' />
    </S.SwiperWrapper>
  );
};

export default ImageCarousel;
