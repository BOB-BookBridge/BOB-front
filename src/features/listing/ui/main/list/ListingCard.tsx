'use client';

import Image from 'next/image';
import { convertDiffToString, postStatusMap } from '@/shared/lib';
import { PostModel } from '@/entities/listing/types';
import { getCategoryNameById } from '../../../lib';
import ListingCardTag from './ListingCardTag';
import * as S from './ListingCard.styles';

const ListingCard = ({ data }: { data: PostModel }) => {
  const categoryName = getCategoryNameById(data.categoryId);
  const time = convertDiffToString(data.createdAt);

  return (
    <S.CardContainer href={`/listings/${data.id}`}>
      <S.ImageWrapper>
        <S.Overlay>
          <S.OverlayDim $status={data.status} />
          {data.status !== 'READY' && (
            <S.OverlayStatusText>
              {postStatusMap[data.status]}
            </S.OverlayStatusText>
          )}
          {data.participation === 'CANCELED' ||
            data.participation === 'REQUESTED' ||
            data.participation === 'ACCEPTED' ||
            (data.participation === 'REJECTED' && (
              <S.LeftTagWrapper>
                <ListingCardTag $tradeStatus={data.participation} />
              </S.LeftTagWrapper>
            ))}
          <S.RightTagWrapper>
            <ListingCardTag $bookStatus={data.bookStatus} />
          </S.RightTagWrapper>
        </S.Overlay>
        <Image
          src={data.thumbnailUrl}
          alt='책 대표사진'
          fill
          sizes='(max-width: 744px) 50vw, 20vw'
          unoptimized
        />
      </S.ImageWrapper>
      <S.TitleText>{data.title}</S.TitleText>
      <S.PriceText>{data.price.toLocaleString('ko-KR')}원</S.PriceText>
      <S.InfoText>
        {categoryName} · {time}
      </S.InfoText>
    </S.CardContainer>
  );
};

export default ListingCard;
