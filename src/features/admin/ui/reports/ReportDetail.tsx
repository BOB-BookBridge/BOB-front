import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Button, LoadingContainer, LoadingIndicator } from '@/shared/ui';
import { ClockIconSm, DropdownIconSm } from '@/shared/assets/icons';
import * as S from './ReportDetail.styles';
import * as C from '../DetailPage.styles';
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
        <C.Container>
          <C.Header>
            <C.Title>신고 상세</C.Title>
            <C.StatusBox $status={data.status}>
              {reportStatusMap[data.status]}
            </C.StatusBox>
          </C.Header>
          <C.ContentWrapper>
            <C.LeftSection>
              <C.Section>
                <C.SectionTitle>기본 정보</C.SectionTitle>
                <C.InfoRow>
                  <C.InfoLabel>신고 유형</C.InfoLabel>
                  <C.InfoValue>{reportTypeMap[data.type]}</C.InfoValue>
                </C.InfoRow>
                <C.InfoRow>
                  <C.InfoLabel>신고 사유</C.InfoLabel>
                  <C.InfoValue>{data.reason}</C.InfoValue>
                </C.InfoRow>
                <C.InfoRow>
                  <C.InfoLabel>신고 일시</C.InfoLabel>
                  <C.InfoValue>{formatDateTime(data.createdAt)}</C.InfoValue>
                </C.InfoRow>
                <C.InfoRow>
                  <C.InfoLabel>처리 횟수</C.InfoLabel>
                  <C.InfoValue>{data.reportedProcessedCount}회</C.InfoValue>
                </C.InfoRow>
              </C.Section>
              <C.Section>
                <C.SectionTitle>피신고자 정보</C.SectionTitle>
                <C.InfoRow>
                  <C.InfoLabel>닉네임</C.InfoLabel>
                  <C.InfoValue>{data.reported.nickname}</C.InfoValue>
                </C.InfoRow>
                <C.InfoRow>
                  <C.InfoLabel>이메일</C.InfoLabel>
                  <C.InfoValue>{data.reported.email}</C.InfoValue>
                </C.InfoRow>
              </C.Section>
              <C.Section>
                <C.SectionTitle>신고자 정보</C.SectionTitle>
                <C.InfoRow>
                  <C.InfoLabel>닉네임</C.InfoLabel>
                  <C.InfoValue>{data.reporter.nickname}</C.InfoValue>
                </C.InfoRow>
                <C.InfoRow>
                  <C.InfoLabel>이메일</C.InfoLabel>
                  <C.InfoValue>{data.reporter.email}</C.InfoValue>
                </C.InfoRow>
              </C.Section>
              <C.Section>
                <C.SectionTitle>신고된 컨텐츠</C.SectionTitle>
                {data.type === 'POST' ? (
                  <C.InfoRow>
                    <C.PostImageWrapper>
                      <Image
                        src={data.reportedContent.thumbnailUrl}
                        alt={`${data.reportedContent.title} 이미지`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </C.PostImageWrapper>
                    <S.PostPreview>
                      <S.PostTitle>{data.reportedContent.title}</S.PostTitle>
                      <S.PostContent>
                        {data.reportedContent.description}
                      </S.PostContent>
                    </S.PostPreview>
                  </C.InfoRow>
                ) : (
                  <S.ChatPreview>
                    <C.InfoLabel>채팅 내역</C.InfoLabel>
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
              </C.Section>
            </C.LeftSection>
            <C.RightSection>
              <C.Section>
                <C.SectionTitle>상태 변경</C.SectionTitle>
                <C.InfoLabel>처리 상태</C.InfoLabel>
                <C.DropdownWrapper ref={dropdownRef}>
                  <C.StatusDropdown onClick={handleClickDropdown}>
                    {reportStatusMap[statusValue]}
                    {data.status !== 'PROCESSED' && <DropdownIconSm />}
                  </C.StatusDropdown>
                  {isOpenDropdown && (
                    <C.DropdownItems>
                      {options.map((opt) => (
                        <C.DropdownItem
                          key={opt}
                          onClick={() => handleClickStatus(opt)}
                          $active={opt === statusValue}>
                          {reportStatusMap[opt]}
                        </C.DropdownItem>
                      ))}
                    </C.DropdownItems>
                  )}
                </C.DropdownWrapper>
                <C.InfoLabel>메모(선택 사항)</C.InfoLabel>
                <C.Textarea
                  placeholder='처리 사항이나 특이 사항을 입력하세요'
                  value={memoText}
                  onChange={(e) => setMemoText(e.target.value)}
                />
                <C.ButtonWrapper>
                  <Button
                    text='적용'
                    onClick={handleChangeStatus}
                    variant='secondary'
                    size='free'
                  />
                </C.ButtonWrapper>
              </C.Section>
              {(data.processedAt || data.managerNickname) && (
                <C.Section>
                  <C.SectionTitle>처리 정보</C.SectionTitle>
                  <C.InfoRow>
                    {data.processedAt ? (
                      <C.ProcessLabel>
                        <ClockIconSm stroke='currentColor' />
                        {formatDateTime(data.processedAt)}
                      </C.ProcessLabel>
                    ) : (
                      <C.InfoLabel>처리 중</C.InfoLabel>
                    )}
                    <C.InfoValue>{data.managerNickname}</C.InfoValue>
                  </C.InfoRow>
                </C.Section>
              )}
            </C.RightSection>
          </C.ContentWrapper>
        </C.Container>
      )}
    </>
  );
};

export default ReportDetail;
