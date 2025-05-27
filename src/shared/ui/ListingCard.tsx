'use client';

import ListingCardTag from './ListingCardTag';
import { bookStatusMap, getCategoryNameById, tradeStatusMap } from '../lib';
import * as S from './ListingCard.styles';

interface ListingCardProps {
  postId: number;
  categoryId: number;
  title: string;
  tradeStatus: 'READY' | 'IN_PROGRESS' | 'COMPLETED';
  sellPrice: number;
  thumbnail: string;
  bookStatus: 'BEST' | 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: string;
}

const data: ListingCardProps = {
  postId: 1,
  categoryId: 10,
  title: '자바 성능 튜닝 이야기 - 개발자가 반드시 알아야 할',
  tradeStatus: 'READY',
  sellPrice: 8000,
  thumbnail:
    'https://image.aladin.co.kr/product/7924/83/coversum/k542434036_1.jpg',
  bookStatus: 'BEST',
  createdAt: '2024-03-29T10:22:00',
};

const ListingCard = () => {
  const categoryName = getCategoryNameById(data.categoryId);

  return (
    <S.CardContainer>
      <S.ImageWrapper>
        <S.Overlay>
          <S.OverlayDim status={data.tradeStatus} />
          {data.tradeStatus !== 'READY' && (
            <S.OverlayStatusText>
              {tradeStatusMap[data.tradeStatus]}
            </S.OverlayStatusText>
          )}
          <S.TagWrapper>
            <ListingCardTag
              text={bookStatusMap[data.bookStatus]}
              type='STATUS'
            />
          </S.TagWrapper>
        </S.Overlay>
        <S.Image src={data.thumbnail} />
      </S.ImageWrapper>
      <S.TitleText>{data.title}</S.TitleText>
      <S.InfoWrapper>
        <S.PriceText>{data.sellPrice.toLocaleString('ko-KR')}원</S.PriceText>
        <ListingCardTag
          text={categoryName ? categoryName : '찾을 수 없음'}
          type='CATEGORY'
        />
      </S.InfoWrapper>
    </S.CardContainer>
  );
};

export default ListingCard;
