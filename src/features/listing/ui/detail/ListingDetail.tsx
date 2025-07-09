'use client';

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import { useLikeMutation, useListingDetailQuery } from '@/entities/listing';
import { bookStatusMap, convertDiffToString } from '@/shared/lib';
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
  const [liked, setLiked] = useState<boolean | undefined>(undefined);
  const [originalLiked, setOriginalLiked] = useState<boolean | undefined>(
    undefined,
  );
  const [likeCount, setLikeCount] = useState<number | undefined>(undefined);
  const { mutate: controlLike } = useLikeMutation();

  function handleLike() {
    if (data?.isOwner) {
      toast.info('본인의 게시글은 찜할 수 없어요');
      return;
    }
    setLiked((prev) => !prev);
  }

  useEffect(() => {
    if (data) {
      setLiked(data.isFavorite);
      setOriginalLiked(data.isFavorite);
      setLikeCount(data.scrapCount);
    }
  }, [data]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (liked !== undefined && liked !== originalLiked) {
        controlLike(
          { postId: id, like: liked },
          {
            onSuccess: () => {
              setOriginalLiked(liked);
              setLikeCount((prev) => {
                const safePrev = prev ?? 0;
                return liked ? safePrev + 1 : safePrev - 1;
              });
            },
          },
        );
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [liked]);

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
                조회 {data.viewCount} · 찜 {likeCount}
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
