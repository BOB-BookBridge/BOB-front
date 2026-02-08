import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button, LoadingContainer, LoadingIndicator } from '@/shared/ui';
import { ClockIconSm, DropdownIconSm } from '@/shared/assets/icons';
import * as S from './ReportDetail.styles';
import {
  ReportStatus,
  useReportMutation,
  useReportQuery,
} from '@/entities/admin/reports';
import {
  formatDateTime,
  reportStatusMap,
  reportTypeMap,
  showToast,
} from '@/shared/lib';

const options = ['IN_REVIEW', 'CLOSED', 'PROCESSED'] as const;

const ReportDetail = ({ id }: { id: number }) => {
  const { isPending, data } = useReportQuery(id);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [statusValue, setStatusValue] = useState<ReportStatus>('PENDING');
  const [memoText, setMemoText] = useState('');

  useEffect(() => {
    if (data) setStatusValue(data.status);
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

  function handleClickStatus(value: ReportStatus) {
    setStatusValue(value);
    setIsOpenDropdown(false);
  }
  const { mutate } = useReportMutation(id);
  function handleChangeStatus() {
    mutate(
      { status: statusValue, memo: memoText },
      { onSuccess: () => showToast.success('변경 사항이 적용되었습니다.') },
    );
  }

  if (isPending)
    return (
      <LoadingContainer>
        <LoadingIndicator />
      </LoadingContainer>
    );

  return (
    <>
      {data && (
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
                        <S.MessageTime>
                          {formatDateTime(mes.sentAt)}
                        </S.MessageTime>
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
      )}
    </>
  );
};

export default ReportDetail;
