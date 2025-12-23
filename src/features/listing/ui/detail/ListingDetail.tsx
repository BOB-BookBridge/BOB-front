'use client';

import { useEffect, useState } from 'react';
import { bookStatusMap, convertDiffToString } from '@/shared/lib';
import { LoadingContainer } from '@/shared/ui/LoadingIndicator';
import { useListingDetailQuery } from '@/entities/listing';
import BookItem from '@/features/user/ui/profile/BookItem';
import ListingDetailActions from './ListingDetailActions';
import { getCategoryNameById } from '../../lib';
import { LoadingIndicator } from '@/shared/ui';
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
  const { data, isPending } = useListingDetailQuery(id);
  const [likeCount, setLikeCount] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (data) {
      setLikeCount(data.scrapCount);
    }
  }, [data]);

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
                <EditMenu
                  writerId={data.writer.id}
                  isOwner={data.isOwner}
                  postStatus={data.tradeStatus}
                  postId={data.id}
                />
              </S.HeaderRow>

              <S.MetaRow>
                <S.SubText>
                  #{getCategoryNameById(data.categoryId)} · #
                  {bookStatusMap[data.bookStatus]} ·{' '}
                  {convertDiffToString(data.createdAt)}
                </S.SubText>
                <S.SubText>
                  조회 {data.viewCount} · 찜 {likeCount}
                </S.SubText>
              </S.MetaRow>

              <S.HeadingText>{data.price.toLocaleString()}원</S.HeadingText>
              <S.Description>{data.description}</S.Description>

              <BookInfo
                author={data.book.author}
                pubDate={data.book.pubDate}
                description={data.book.description}
              />
              {data && !data.isOwner && (
                <ListingDetailActions data={data} postId={id} />
              )}
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
        <LoadingContainer>
          <LoadingIndicator />
        </LoadingContainer>
      )}
    </>
  );
};

export default ListingDetail;
