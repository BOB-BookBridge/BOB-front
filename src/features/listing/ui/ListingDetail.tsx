'use client';

import { data } from '@/mocks/mockListingDetail';
import styled from 'styled-components';
import { getCategoryNameById } from '../lib';
import { bookStatusMap, convertDateToString } from '@/shared/lib';

interface ListingDetailProps {
  id: number;
}

const ListingDetail = ({ id }: ListingDetailProps) => {
  const visibleData = data.find((e) => e.postId === id);
  if (!visibleData) return null;

  return (
    <Container>
      <LeftSection>
        <ImageCarousel>이미지 캐러셀</ImageCarousel>
        <UserInfo>
          <Avatar>프사</Avatar>
          <UserText>
            <div>{visibleData.writer.nickname}</div>
            <div>{visibleData.writer.activityArea}</div>
          </UserText>
        </UserInfo>
      </LeftSection>

      <RightSection>
        <HeaderRow>
          <div>{visibleData.book.title}</div>
          <div>...</div>
        </HeaderRow>

        <MetaRow>
          <div>
            #{getCategoryNameById(visibleData.category)} · #
            {bookStatusMap[visibleData.bookStatus]} ·{' '}
            {convertDateToString(visibleData.createdAt)}
          </div>
          <div>
            조회 {visibleData.viewCount} · 찜 {visibleData.scrapCount}
          </div>
        </MetaRow>

        <Price>{visibleData.sellPrice.toLocaleString()}원</Price>
        <Description>{visibleData.description}</Description>

        <SectionTitle>책 기본 정보</SectionTitle>
        <InfoGrid>
          <div>저자</div>
          <div>{visibleData.book.author}</div>

          <div>출간일</div>
          <div>{visibleData.book.pubDate}</div>

          <div>정가</div>
          <div>{visibleData.book.priceStandard}</div>

          <div>책소개</div>
          <div>{visibleData.book.description}</div>
        </InfoGrid>

        <ButtonRow>
          <div>찜하기</div>
          <div>채팅하기</div>
        </ButtonRow>
      </RightSection>
    </Container>
  );
};

export default ListingDetail;

const Container = styled.div`
  display: flex;
  @media (max-width: 479px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 0.8;
  padding: 20px;
`;

const RightSection = styled.div`
  flex: 1;
  padding: 20px;
`;

const ImageCarousel = styled.div`
  background-color: pink;
  width: 100%;
  padding-bottom: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
`;

const Avatar = styled.div``;

const UserText = styled.div``;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

const Price = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin: 10px 0;
`;

const Description = styled.div`
  margin-bottom: 16px;
`;

const SectionTitle = styled.div`
  margin-top: 20px;
  font-weight: 600;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  row-gap: 10px;
  column-gap: 12px;
  margin: 10px 0;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
