'use client';

import Image from 'next/image';
import { useState } from 'react';
import { bookStatusMap, formatYear } from '@/shared/lib';
import { DropdownIconSm } from '@/shared/assets/icons';
import { BookStatus } from '@/entities/listing';
import { LoadingIndicator } from '@/shared/ui';
import { sendChatToAI } from '@/entities/ai';
import {
  AITrigger,
  BookContainer,
  FeedbackWrapper,
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
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function handleClickAITrigger() {
    setOpenAISummary((prev) => !prev);
    if (!summary) {
      setIsLoading(true);
      try {
        const res = await sendChatToAI({
          messages: [{ role: 'user', content: `${book.title}을 요약해줘` }],
        });
        setSummary(res.reply);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
      }
    }
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
          {isLoading ? (
            <FeedbackWrapper>
              <LoadingIndicator text='요약 중' />
            </FeedbackWrapper>
          ) : isError ? (
            <FeedbackWrapper>
              문제가 발생했습니다. 창을 닫고 다시 실행해 주세요
            </FeedbackWrapper>
          ) : (
            summary && summary
          )}
        </Summary>
      )}
    </div>
  );
};

export default TradeDetailBookItem;
