import { useEffect, useRef, useState } from 'react';
import {
  useAdminInquiryMutation,
  useInquiryQuery,
} from '@/entities/admin/inquirues/queries';
import { formatDateTime, inquiryStatusMap, showToast } from '@/shared/lib';
import { InquiryStatus } from '@/entities/admin/inquirues';
import { Button, LoadingIndicator } from '@/shared/ui';
import { DropdownIconSm } from '@/shared/assets/icons';
import { useMyQuery } from '@/entities/user';
import * as S from './InquiryDetail.styles';

const options = ['PENDING', 'IN_REVIEW', 'CLOSED'] as const;

const InquiryDetail = ({ id }: { id: number }) => {
  const { data: myData } = useMyQuery();
  const { isPending, data } = useInquiryQuery(id);
  const { mutate } = useAdminInquiryMutation(id);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    if (data) {
      setReplyContent(data.reply ?? '');
    }
  }, [data]);

  useEffect(() => {
    if (!isOpenDropdown) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdown(false);
      }
    };

    if (isOpenDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenDropdown]);

  if (isPending) return <LoadingIndicator />;
  if (!data) return <div>데이터가 존재하지 않습니다.</div>;

  const needReply =
    data.status === 'PENDING' ||
    (data.status === 'IN_REVIEW' && data.managerNickname === myData?.nickname);

  function handleClickDropdown() {
    if (data && data.status === 'PROCESSED') return;
    setIsOpenDropdown((prev) => !prev);
  }

  function handleChangeStatus(value: InquiryStatus) {
    if (data && data.status !== value) {
      mutate({ status: value }, { onSuccess: () => setIsOpenDropdown(false) });
    }
  }

  function handleReplySubmit() {
    const trimmedContent = replyContent.trim();
    if (!trimmedContent) {
      return;
    }
    mutate(
      { status: 'PROCESSED', reply: trimmedContent },
      {
        onSuccess: () => showToast.success('답변이 정상적으로 등록되었습니다.'),
      },
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>문의 상세</S.Title>
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <S.StatusDropdown onClick={handleClickDropdown} $status={data.status}>
            {inquiryStatusMap[data.status]}
            {data.status !== 'PROCESSED' && <DropdownIconSm />}
          </S.StatusDropdown>
          {isOpenDropdown && (
            <S.DropdownItems>
              {options.map((opt) => (
                <S.DropdownItem
                  key={opt}
                  onClick={() => handleChangeStatus(opt)}
                  $active={opt === data.status}>
                  {inquiryStatusMap[opt]}
                </S.DropdownItem>
              ))}
            </S.DropdownItems>
          )}
        </div>
      </S.Header>

      <S.Section>
        <S.SectionTitle>문의</S.SectionTitle>
        <S.InfoLabel>제목</S.InfoLabel>
        <S.InquiryTitle>{data.title}</S.InquiryTitle>
        <S.InfoLabel>내용</S.InfoLabel>
        <S.InfoValue>{data.content}</S.InfoValue>

        <S.InfoGrid>
          <S.InfoItem>
            <S.IconLabel>📧</S.IconLabel>
            <S.InfoContent>
              <S.InfoLabel>작성자 이메일</S.InfoLabel>
              <S.InfoValue>{data.email}</S.InfoValue>
            </S.InfoContent>
          </S.InfoItem>

          <S.InfoItem>
            <S.IconLabel>📅</S.IconLabel>
            <S.InfoContent>
              <S.InfoLabel>작성일</S.InfoLabel>
              <S.InfoValue>{formatDateTime(data.createdAt)}</S.InfoValue>
            </S.InfoContent>
          </S.InfoItem>

          <S.InfoItem>
            <S.IconLabel>👤</S.IconLabel>
            <S.InfoContent>
              <S.InfoLabel>담당자</S.InfoLabel>
              <S.InfoValue>{data.managerNickname ?? '-'}</S.InfoValue>
            </S.InfoContent>
          </S.InfoItem>
        </S.InfoGrid>
      </S.Section>

      <S.Section>
        <S.SectionTitle>답변</S.SectionTitle>
        {data.processedAt && data.status === 'PROCESSED' && (
          <S.AnswerDate>{formatDateTime(data.processedAt)} 답변됨</S.AnswerDate>
        )}
        <S.ReplyForm>
          <S.ReplyTextarea
            disabled={!needReply}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder='고객 문의에 대한 답변을 작성해주세요'
            maxLength={1000}
          />
        </S.ReplyForm>
      </S.Section>

      {needReply && (
        <S.ButtonWrapper>
          <Button
            text='답변하기'
            onClick={handleReplySubmit}
            variant='secondary'
          />
        </S.ButtonWrapper>
      )}
    </S.Container>
  );
};

export default InquiryDetail;
