'use client';

import Image from 'next/image';
import { useState } from 'react';
import { bookStatusMap, formatYear } from '@/shared/lib';
import { DropdownIconSm } from '@/shared/assets/icons';
import { BookStatus } from '@/entities/listing';
import {
  AITrigger,
  BookContainer,
  ImageWrapper,
  Meta,
  Price,
  Summary,
  Title,
} from './styles';

interface TradeDetailBookItem {
  id: number;
  status: BookStatus;
  title: string;
  author: string;
  priceStandard: number;
  cover: string;
  pubDate: string;
  available: boolean;
}

const TradeDetailBookItem = ({
  isMine,
  book,
}: {
  isMine: boolean;
  book: TradeDetailBookItem;
}) => {
  const [openAISummary, setOpenAISummary] = useState(false);

  function handleClickAITrigger() {
    setOpenAISummary((prev) => !prev);
  }
  return (
    <div>
      <BookContainer>
        <ImageWrapper>
          <Image
            src={book.cover}
            alt={book.title}
            fill
            style={{ objectFit: 'cover' }}
          />
        </ImageWrapper>
        <div>
          <Title>{book.title}</Title>
          <Meta>
            {book.author} · {formatYear(book.pubDate)} |{' '}
            {bookStatusMap[book.status]}
          </Meta>
          <Price>{book.priceStandard.toLocaleString('ko-KR')}원</Price>
        </div>
        {!isMine && (
          <AITrigger
            onClick={handleClickAITrigger}
            $openAISummary={openAISummary}>
            <div>{openAISummary ? '요약 닫기' : 'AI 요약 보기'}</div>
            <DropdownIconSm />
          </AITrigger>
        )}
      </BookContainer>
      {openAISummary && (
        <Summary>
          『파쇄』는 구병모 작가의 소설로, 현대인의 내면적 고뇌와 소외를
          다룹니다. 이야기는 다양한 인물의 삶을 통해 인간 존재의 부조리함과
          상처를 조명하며, 개인이 겪는 고통과 그 속에서 찾는 구원에 대한 사유를
          담고 있습니다. 각 인물은 서로 연결되며, 그들의 이야기가 하나의 거대한
          파편처럼 엮여져 있음을 보여줍니다. 이 책은 서늘한 분위기를
          유지하면서도 깊은 감정적 공감을 불러일으킵니다.
        </Summary>
      )}
    </div>
  );
};

export default TradeDetailBookItem;
