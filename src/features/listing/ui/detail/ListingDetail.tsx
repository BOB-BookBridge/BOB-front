'use client';

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

import { useLikeMutation, useListingDetailQuery } from '@/entities/listing';
import { bookStatusMap, convertDiffToString } from '@/shared/lib';
import { calcDistance, getCategoryNameById } from '../../lib';
import { LoadingIndicator, ModalLayout } from '@/shared/ui';
import BookItem from '@/features/user/ui/profile/BookItem';
import { TradeRequest } from '@/features/trade/ui';
import { useChatMutation } from '@/entities/chat';
import { LikeIcon } from '@/shared/assets/icons';
import { useMyQuery } from '@/entities/user';
import { colors } from '@/shared/constants';
import * as S from './ListingDetail.styles';
import ImageCarousel from './ImageCarousel';
import UserInfo from './UserInfo';
import EditMenu from './EditMenu';
import BookInfo from './BookInfo';
import {
  Interest,
  InterestsWrapper,
} from '@/features/user/ui/profile/Interests';

const ListingDetail = ({ id }: { id: number }) => {
  const theme = useTheme();
  const { data: mydata } = useMyQuery();
  const { data, isPending } = useListingDetailQuery(id);
  const [liked, setLiked] = useState<boolean | undefined>(undefined);
  const [originalLiked, setOriginalLiked] = useState<boolean | undefined>(
    undefined,
  );
  const [likeCount, setLikeCount] = useState<number | undefined>(undefined);
  const { mutate: controlLike } = useLikeMutation();
  const { mutate: makeChat } = useChatMutation();
  const [openTradeRequest, setOpenTradeRequest] = useState(false);

  function handleLike() {
    if (data?.isOwner) {
      toast.info('본인의 게시글은 찜할 수 없어요');
      return;
    }
    setLiked((prev) => !prev);
  }

  function handleClickExchange() {
    if (!data || !mydata) {
      toast.info('로그인 후 이용해 주세요');
      return;
    }
    setOpenTradeRequest(true);
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
    <>
      {data && !isPending ? (
        <S.Container>
          <S.TopSection>
            <S.LeftSection>
              <ImageCarousel
                images={data.images.length > 0 ? data.images : undefined}
                thumbnail={
                  data.images.length > 0 ? undefined : data.thumbnailUrl
                }
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
                    stroke={
                      !liked ? theme.colors.GRAY_500 : theme.colors.PRIMARY
                    }
                    strokeWidth={1.5}
                  />
                  찜하기
                </S.Button>
                <S.Button variant='primary' onClick={handleClickExchange}>
                  교환 신청
                </S.Button>
              </S.ButtonRow>
              {data.wishOnly && (
                <S.InfoText>
                  *판매자의 희망 도서만 제안할 수 있습니다
                </S.InfoText>
              )}
              {data.writer.interests.length > 0 && (
                <div>
                  <S.SectionTitle>판매자의 관심사</S.SectionTitle>
                  <InterestsWrapper>
                    {data.writer.interests.map((interest, idx) => (
                      <Interest key={idx}>{interest}</Interest>
                    ))}
                  </InterestsWrapper>
                </div>
              )}
            </S.RightSection>
          </S.TopSection>
          {data.writer.wishes.length > 0 && (
            <div style={{ paddingLeft: 20 }}>
              <S.SectionTitle>판매자의 희망 도서</S.SectionTitle>
              <S.BookList>
                {data.writer.wishes.map((book) => (
                  <BookItem key={book.id} book={book} editMode={false} />
                ))}
              </S.BookList>
            </div>
          )}
        </S.Container>
      ) : (
        <S.LoadingContainer>
          <LoadingIndicator text='불러오는중' />
        </S.LoadingContainer>
      )}
      {openTradeRequest && mydata && data && (
        <ModalLayout
          isOpen={openTradeRequest}
          title='교환할 책을 선택해 주세요'
          onClose={() => setOpenTradeRequest(false)}>
          <TradeRequest
            isFar={calcDistance(mydata.area.emdId, data.writer.emdId)}
            postId={id}
            onClose={() => setOpenTradeRequest(false)}
          />
        </ModalLayout>
      )}
    </>
  );
};

export default ListingDetail;
