'use client';

import ListingCardTag from './ListingCardTag';
import {
  bookStatusMap,
  getCategoryNameById,
  tradeStatusMap,
} from '../../../shared/lib';
import * as S from './ListingCard.styles';
import { ListingCardProps } from '@/entities/listing/model/types';

const ListingCard = ({ data }: { data: ListingCardProps }) => {
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
