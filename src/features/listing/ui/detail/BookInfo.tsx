import { useState } from 'react';
import * as S from './ListingDetail.styles';

interface BookInfoProps {
  author: string;
  pubDate: string;
  description: string;
}
const BookInfo = ({ author, pubDate, description }: BookInfoProps) => {
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  function handleInfoToggle() {
    setIsOpenInfo((prev) => !prev);
  }
  return (
    <div>
      <S.InfoSectionTitle onClick={handleInfoToggle}>
        책 정보 더보기
      </S.InfoSectionTitle>
      {isOpenInfo && (
        <S.InfoGrid>
          <S.Text>저자</S.Text>
          <S.Text>{author}</S.Text>

          <S.Text>출간일</S.Text>
          <S.Text>{pubDate}</S.Text>

          <S.Text>책소개</S.Text>
          <S.Text>{description}</S.Text>
        </S.InfoGrid>
      )}
    </div>
  );
};

export default BookInfo;
