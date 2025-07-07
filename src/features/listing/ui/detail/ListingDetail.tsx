'use client';

import { useState } from 'react';
import { useTheme } from 'styled-components';

import { bookStatusMap, convertDiffToString } from '@/shared/lib';
import { useListingDetailQuery } from '@/entities/listing';
import { LikeIcon } from '@/shared/assets/icons';
import { getCategoryNameById } from '../../lib';
import { colors } from '@/shared/constants';
import * as S from './ListingDetail.styles';
import ImageCarousel from './ImageCarousel';
import UserInfo from './UserInfo';
import EditMenu from './EditMenu';
import BookInfo from './BookInfo';

interface ListingDetailProps {
  id: number;
}

const ListingDetail = ({ id }: ListingDetailProps) => {
  const theme = useTheme();
  const { data, isLoading } = useListingDetailQuery(id);
  const [liked, setLiked] = useState(data?.isFavorite);
  function handleLike() {
    setLiked((prev) => !prev);
    // 서버 전송 시 debounce 사용
  }

  return (
    <S.Container>
      {data && !isLoading ? (
        <>
          <S.LeftSection>
            <ImageCarousel
              images={data.images.length > 0 ? data.images : undefined}
              thumbnail={data.images.length > 0 ? undefined : data.thumbnailUrl}
            />
            <UserInfo writer={data.writer} />
          </S.LeftSection>

          <S.RightSection>
            <S.HeaderRow>
              <S.HeadingText>{data.book.title}</S.HeadingText>
              {data.isOwner && (
                <EditMenu postStatus={data.postStatus} postId={data.postId} />
              )}
            </S.HeaderRow>

            <S.MetaRow>
              <S.SubText>
                #{getCategoryNameById(data.category)} · #
                {bookStatusMap[data.bookStatus]} ·{' '}
                {convertDiffToString(data.createdAt)}
              </S.SubText>
              <S.SubText>
                조회 {data.viewCount} · 찜 {data.scrapCount}
              </S.SubText>
            </S.MetaRow>

            <S.HeadingText>{data.sellPrice.toLocaleString()}원</S.HeadingText>
            <S.Description>{data.description}</S.Description>

            <BookInfo
              author={data.book.author}
              pubDate={data.book.pubDate}
              priceStandard={data.book.priceStandard}
              description={data.book.description}
            />
            <S.ButtonRow>
              <S.Button
                variant={liked ? 'outline-primary' : 'outline-gray'}
                onClick={handleLike}>
                <LikeIcon
                  fill={liked ? colors.light.PRIMARY : 'none'}
                  stroke={!liked ? theme.colors.GRAY_500 : theme.colors.PRIMARY}
                  strokeWidth={1.5}
                />
                찜하기
              </S.Button>
              <S.Button variant='primary'>채팅하기</S.Button>
            </S.ButtonRow>
          </S.RightSection>
        </>
      ) : (
        <></>
      )}
    </S.Container>
  );
};

export default ListingDetail;
