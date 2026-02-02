import { useEffect, useRef, useState } from 'react';
import { InquiryDetailRes, InquiryStatus } from '@/entities/admin/inquirues';
import { formatDateTime, inquiryStatusMap } from '@/shared/lib';
import { DropdownIconSm } from '@/shared/assets/icons';
import { useMyQuery } from '@/entities/user';
import { Button } from '@/shared/ui';
import * as S from './InquiryDetail.styles';

const data: InquiryDetailRes = {
  id: 2,
  email: 'znight1020@naver.com',
  title: '아니이거 왜 안 되나요?',
  content:
    '원래 이거 이렁쿵저러쿵뭐시기저시기해서 이렇게저렇게 되어야 하느 거 아닌가요? 근데 안 돼요 ',
  reply:
    '아 그거는 이러쿵저러쿵 이렇습니다. 불편함을 겪게 하여 죄송합니다. 좋은 하루 보내세요 :)',
  status: 'IN_REVIEW',
  managerNickname: 'manager',
  processedAt: '2026-01-21T10:34:00',
  createdAt: '2026-01-20T07:34:41',
};

const options = ['PENDING', 'IN_REVIEW', 'CLOSED'] as const;

const InquiryDetail = () => {
  const { data: myData } = useMyQuery();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<InquiryStatus>(
    data.status,
  );
  const [replyContent, setReplyContent] = useState(data.reply ?? '');
  const needReply =
    data.status === 'PENDING' ||
    (data.status === 'IN_REVIEW' && data.managerNickname === myData?.nickname);

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

  function handleClickDropdown() {
    if (selectedStatus === 'PROCESSED') return;
    setIsOpenDropdown((prev) => !prev);
  }

  function handleChangeStatus(value: InquiryStatus) {
    if (selectedStatus !== value) {
      setSelectedStatus(value);
    }
    setIsOpenDropdown(false);
  }

  function handleReplySubmit() {
    const trimmedContent = replyContent.trim();
    if (!trimmedContent) {
      return;
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>문의 상세</S.Title>
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <S.StatusDropdown
            onClick={handleClickDropdown}
            $status={selectedStatus}>
            {inquiryStatusMap[selectedStatus]}
            {selectedStatus !== 'PROCESSED' && <DropdownIconSm />}
          </S.StatusDropdown>
          {isOpenDropdown && (
            <S.DropdownItems>
              {options.map((opt) => (
                <S.DropdownItem
                  key={opt}
                  onClick={() => handleChangeStatus(opt)}
                  $active={opt === selectedStatus}>
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
