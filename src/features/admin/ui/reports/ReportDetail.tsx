import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { formatDateTime, reportStatusMap, reportTypeMap } from '@/shared/lib';
import { ClockIconSm, DropdownIconSm } from '@/shared/assets/icons';
import { ReportStatus } from '@/entities/admin/reports';
import * as S from './ReportDetail.styles';
import { Button } from '@/shared/ui';

const data = {
  id: 2,
  status: 'PENDING',
  type: 'CHAT',
  reason: '욕설/비방',
  reporter: {
    id: '019b0689-4ddd-7d0e-807a-cff21461a374',
    email: 'manager@bob.com',
    nickname: 'manager001',
  },
  reported: {
    id: '019b0689-4ddd-7d0e-807a-bfcbcc682200',
    email: 'znight1020@naver.com',
    nickname: 'leehs',
  },
  reportedContent: {
    messages: [
      {
        content: '거리가 먼 사용자와의 채팅입니다.',
        sentAt: '2025-12-20T20:10:44.933867',
      },
      {
        content: '안녕하세요',
        sentAt: '2026-01-14T13:59:39.222692',
      },
      {
        content: '어쩌구저쩌구',
        sentAt: '2026-01-14T13:59:42.753095',
      },
    ],
  },
  reportedProcessedCount: 0,
  managerNickname: null,
  processedAt: null,
  createdAt: '2026-01-14T14:00:57',
} as const;

const options = ['IN_REVIEW', 'CLOSED', 'PROCESSED'] as const;
const ReportDetail = ({ id }: { id: number }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [statusValue, setStatusValue] = useState<ReportStatus>('PENDING');
  const [memoText, setMemoText] = useState('');

  useEffect(() => {
    setStatusValue(data.status);
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

  function handleClickDropdown() {
    if (data && data.status === 'PROCESSED') return;
    setIsOpenDropdown((prev) => !prev);
  }

  function handleChangeStatus() {
    console.log(statusValue, memoText);
  }

  function handleClickStatus(value: ReportStatus) {
    setStatusValue(value);
    setIsOpenDropdown(false);
  }
  return (
    <S.Container>
      <S.Header>
        <S.Title>신고 상세</S.Title>
        <S.StatusBox $status={data.status}>
          {reportStatusMap[data.status]}
        </S.StatusBox>
      </S.Header>
      <S.ContentWrapper>
        <S.LeftSection>
          <S.Section>
            <S.SectionTitle>기본 정보</S.SectionTitle>
            <S.InfoRow>
              <S.InfoLabel>신고 유형</S.InfoLabel>
              <S.InfoValue>{reportTypeMap[data.type]}</S.InfoValue>
            </S.InfoRow>
            <S.InfoRow>
              <S.InfoLabel>신고 사유</S.InfoLabel>
              <S.InfoValue>{data.reason}</S.InfoValue>
            </S.InfoRow>
            <S.InfoRow>
              <S.InfoLabel>신고 일시</S.InfoLabel>
              <S.InfoValue>{formatDateTime(data.createdAt)}</S.InfoValue>
            </S.InfoRow>
            <S.InfoRow>
              <S.InfoLabel>처리 횟수</S.InfoLabel>
              <S.InfoValue>{data.reportedProcessedCount}회</S.InfoValue>
            </S.InfoRow>
          </S.Section>
          <S.Section>
            <S.SectionTitle>피신고자 정보</S.SectionTitle>
            <S.InfoRow>
              <S.InfoLabel>닉네임</S.InfoLabel>
              <S.InfoValue>{data.reported.nickname}</S.InfoValue>
            </S.InfoRow>
            <S.InfoRow>
              <S.InfoLabel>이메일</S.InfoLabel>
              <S.InfoValue>{data.reported.email}</S.InfoValue>
            </S.InfoRow>
          </S.Section>
          <S.Section>
            <S.SectionTitle>신고자 정보</S.SectionTitle>
            <S.InfoRow>
              <S.InfoLabel>닉네임</S.InfoLabel>
              <S.InfoValue>{data.reporter.nickname}</S.InfoValue>
            </S.InfoRow>
            <S.InfoRow>
              <S.InfoLabel>이메일</S.InfoLabel>
              <S.InfoValue>{data.reporter.email}</S.InfoValue>
            </S.InfoRow>
          </S.Section>
          <S.Section>
            <S.SectionTitle>신고된 컨텐츠</S.SectionTitle>
            {data.type === 'POST' ? (
              <S.InfoRow>
                <S.PostImageWrapper>
                  <Image
                    src={data.reportedContent.thumbnailUrl}
                    alt={`${data.reportedContent.title} 이미지`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </S.PostImageWrapper>
                <S.PostPreview>
                  <S.PostTitle>{data.reportedContent.title}</S.PostTitle>
                  <S.PostContent>
                    {data.reportedContent.description}
                  </S.PostContent>
                </S.PostPreview>
              </S.InfoRow>
            ) : (
              <S.ChatPreview>
                <S.InfoLabel>채팅 내역</S.InfoLabel>
                {data.reportedContent.messages.map((mes) => (
                  <S.MessageItem key={mes.content + mes.sentAt}>
                    <S.MessageContent>{mes.content}</S.MessageContent>
                    <S.MessageTime>{formatDateTime(mes.sentAt)}</S.MessageTime>
                  </S.MessageItem>
                ))}
              </S.ChatPreview>
            )}
          </S.Section>
        </S.LeftSection>
        <S.RightSection>
          <S.Section>
            <S.SectionTitle>상태 변경</S.SectionTitle>
            <S.InfoLabel>처리 상태</S.InfoLabel>
            <S.DropdownWrapper ref={dropdownRef}>
              <S.StatusDropdown onClick={handleClickDropdown}>
                {reportStatusMap[statusValue]}
                {data.status !== 'PROCESSED' && <DropdownIconSm />}
              </S.StatusDropdown>
              {isOpenDropdown && (
                <S.DropdownItems>
                  {options.map((opt) => (
                    <S.DropdownItem
                      key={opt}
                      onClick={() => handleClickStatus(opt)}
                      $active={opt === statusValue}>
                      {reportStatusMap[opt]}
                    </S.DropdownItem>
                  ))}
                </S.DropdownItems>
              )}
            </S.DropdownWrapper>
            <S.InfoLabel>메모(선택 사항)</S.InfoLabel>
            <S.Textarea
              placeholder='처리 사항이나 특이 사항을 입력하세요'
              value={memoText}
              onChange={(e) => setMemoText(e.target.value)}
            />
            <S.ButtonWrapper>
              <Button
                text='적용'
                onClick={handleChangeStatus}
                variant='secondary'
                size='free'
              />
            </S.ButtonWrapper>
          </S.Section>
          {(data.processedAt || data.managerNickname) && (
            <S.Section>
              <S.SectionTitle>처리 정보</S.SectionTitle>
              <S.InfoRow>
                {data.processedAt ? (
                  <S.ProcessLabel>
                    <ClockIconSm stroke='currentColor' />
                    {formatDateTime(data.processedAt)}
                  </S.ProcessLabel>
                ) : (
                  <S.InfoLabel>처리 중</S.InfoLabel>
                )}
                <S.InfoValue>{data.managerNickname}</S.InfoValue>
              </S.InfoRow>
            </S.Section>
          )}
        </S.RightSection>
      </S.ContentWrapper>
    </S.Container>
  );
};

export default ReportDetail;
