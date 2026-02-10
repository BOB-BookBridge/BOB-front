import { useEffect, useRef, useState } from 'react';
import { formatDateTime, inquiryStatusMap, showToast } from '@/shared/lib';
import { InquiryStatus } from '@/entities/admin/inquirues';
import { Button, LoadingIndicator } from '@/shared/ui';
import { DropdownIconSm } from '@/shared/assets/icons';
import { useMyQuery } from '@/entities/user';
import * as S from './InquiryDetail.styles';
import * as C from '../DetailPage.styles';
import {
  useAdminInquiryMutation,
  useInquiryQuery,
} from '@/entities/admin/inquirues/queries';

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
    <C.Container>
      <C.Header>
        <C.Title>문의 상세</C.Title>
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
      </C.Header>

      <C.Section>
        <C.SectionTitle>문의</C.SectionTitle>
        <C.InfoLabel>제목</C.InfoLabel>
        <S.InquiryTitle>{data.title}</S.InquiryTitle>
        <C.InfoLabel>내용</C.InfoLabel>
        <C.InfoValue>{data.content}</C.InfoValue>

        <S.InfoGrid>
          <S.InfoItem>
            <S.IconLabel>📧</S.IconLabel>
            <S.InfoContent>
              <C.InfoLabel>작성자 이메일</C.InfoLabel>
              <C.InfoValue>{data.email}</C.InfoValue>
            </S.InfoContent>
          </S.InfoItem>

          <S.InfoItem>
            <S.IconLabel>📅</S.IconLabel>
            <S.InfoContent>
              <C.InfoLabel>작성일</C.InfoLabel>
              <C.InfoValue>{formatDateTime(data.createdAt)}</C.InfoValue>
            </S.InfoContent>
          </S.InfoItem>

          <S.InfoItem>
            <S.IconLabel>👤</S.IconLabel>
            <S.InfoContent>
              <C.InfoLabel>담당자</C.InfoLabel>
              <C.InfoValue>{data.managerNickname ?? '-'}</C.InfoValue>
            </S.InfoContent>
          </S.InfoItem>
        </S.InfoGrid>
      </C.Section>

      <C.Section>
        <C.SectionTitle>답변</C.SectionTitle>
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
      </C.Section>

      {needReply && (
        <S.ButtonWrapper>
          <Button
            text='답변하기'
            onClick={handleReplySubmit}
            variant='secondary'
          />
        </S.ButtonWrapper>
      )}
    </C.Container>
  );
};

export default InquiryDetail;
