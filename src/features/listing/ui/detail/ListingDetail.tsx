'use client';

import { useTheme } from 'styled-components';
import { data } from '@/mocks/mockListingDetail';
import { useState } from 'react';

import { colors } from '@/shared/constants';
import { getCategoryNameById } from '../../lib';
import { LikeIcon } from '@/shared/assets/icons';
import { bookStatusMap, convertDiffToString } from '@/shared/lib';
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
  const visibleData = data.find((e) => e.postId === id);
  const [liked, setLiked] = useState(visibleData?.isFavorite);

  if (!visibleData) return null;

  function handleLike() {
    setLiked((prev) => !prev);
    // 서버 전송 시 debounce 사용
  }

  return (
    <S.Container>
      <S.LeftSection>
        <ImageCarousel images={visibleData.images} />
        <UserInfo writer={visibleData.writer} />
      </S.LeftSection>

      <S.RightSection>
        <S.HeaderRow>
          <S.HeadingText>{visibleData.book.title}</S.HeadingText>
          {visibleData.isOwner && (
            <EditMenu
              tradeStatus={visibleData.tradeStatus}
              postId={visibleData.postId}
            />
          )}
        </S.HeaderRow>

        <S.MetaRow>
          <S.SubText>
            #{getCategoryNameById(visibleData.category)} · #
            {bookStatusMap[visibleData.bookStatus]} ·{' '}
            {convertDiffToString(visibleData.createdAt)}
          </S.SubText>
          <S.SubText>
            조회 {visibleData.viewCount} · 찜 {visibleData.scrapCount}
          </S.SubText>
        </S.MetaRow>

        <S.HeadingText>
          {visibleData.sellPrice.toLocaleString()}원
        </S.HeadingText>
        <S.Description>{visibleData.description}</S.Description>

        <BookInfo
          author={visibleData.book.author}
          pubDate={visibleData.book.pubDate}
          priceStandard={visibleData.book.priceStandard}
          description={visibleData.book.description}
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
    </S.Container>
  );
};

export default ListingDetail;
