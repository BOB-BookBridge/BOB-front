'use client';

import Image from 'next/image';
import { convertDiffToString, postStatusMap } from '@/shared/lib';
import { ListingCardProps } from '@/entities/listing/types';
import { getCategoryNameById } from '../../../lib';
import ListingCardTag from './ListingCardTag';
import * as S from './ListingCard.styles';

const ListingCard = ({ data }: { data: ListingCardProps }) => {
  const categoryName = getCategoryNameById(data.categoryId);
  const time = convertDiffToString(data.createdAt);
  return (
    <S.CardContainer href={`/listings/${data.postId}`}>
      <S.ImageWrapper>
        <S.Overlay>
          <S.OverlayDim status={data.postStatus} />
          {data.postStatus !== 'READY' && (
            <S.OverlayStatusText>
              {postStatusMap[data.postStatus]}
            </S.OverlayStatusText>
          )}
          <S.TagWrapper>
            <ListingCardTag status={data.bookStatus} />
          </S.TagWrapper>
        </S.Overlay>
        <Image
          src={data.thumbnailUrl}
          alt='책 대표사진'
          fill
          sizes='(max-width: 744px) 50vw, 20vw'
        />
      </S.ImageWrapper>
      <S.TitleText>{data.postTitle}</S.TitleText>
      <S.PriceText>{data.sellPrice.toLocaleString('ko-KR')}원</S.PriceText>
      <S.InfoText>
        {categoryName} · {time}
      </S.InfoText>
    </S.CardContainer>
  );
};

export default ListingCard;
