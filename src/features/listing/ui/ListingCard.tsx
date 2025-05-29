'use client';

import ListingCardTag from './ListingCardTag';
import {
  bookStatusMap,
  convertDateToString,
  tradeStatusMap,
} from '../../../shared/lib';
import { getCategoryNameById } from '../lib';
import * as S from './ListingCard.styles';
import { ListingCardProps } from '@/entities/listing/model/types';

const ListingCard = ({ data }: { data: ListingCardProps }) => {
  const categoryName = getCategoryNameById(data.categoryId);
  const time = convertDateToString(data.createdAt);
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
            <ListingCardTag status={data.bookStatus} />
          </S.TagWrapper>
        </S.Overlay>
        <S.Image src={data.thumbnail} />
      </S.ImageWrapper>
      <S.TitleText>{data.title}</S.TitleText>
      <S.PriceText>{data.sellPrice.toLocaleString('ko-KR')}원</S.PriceText>
      <S.InfoText>
        {categoryName} · {time}
      </S.InfoText>
    </S.CardContainer>
  );
};

export default ListingCard;
