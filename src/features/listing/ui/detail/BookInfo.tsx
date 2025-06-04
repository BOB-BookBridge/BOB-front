import { useState } from 'react';
import * as S from './ListingDetail.styles';

interface BookInfoProps {
  author: string;
  pubDate: string;
  priceStandard: number;
  description: string;
}
const BookInfo = ({
  author,
  pubDate,
  priceStandard,
  description,
}: BookInfoProps) => {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  function handleInfoToggle() {
    setIsOpenInfo((prev) => !prev);
  }
  return (
    <div>
      <S.SectionTitle onClick={handleInfoToggle}>책 정보 더보기</S.SectionTitle>
      {isOpenInfo && (
        <S.InfoGrid>
          <S.Text>저자</S.Text>
          <S.Text>{author}</S.Text>

          <S.Text>출간일</S.Text>
          <S.Text>{pubDate}</S.Text>

          <S.Text>정가</S.Text>
          <S.Text>{priceStandard}</S.Text>

          <S.Text>책소개</S.Text>
          <S.Text>{description}</S.Text>
        </S.InfoGrid>
      )}
    </div>
  );
};

export default BookInfo;
