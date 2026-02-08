import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ClockIconSm, DropdownIconSm } from '@/shared/assets/icons';
import { adminPostStatusMap, formatDateTime } from '@/shared/lib';
import { AdminPostStatus } from '@/entities/admin/posts';
import * as C from '../DetailPage.styles';
import styled from 'styled-components';
import { Button } from '@/shared/ui';

const data = {
  id: 3020,
  status: 'BANNED',
  title: '빠르게 실패하기',
  thumbnailUrl:
    'https://image.aladin.co.kr/product/30070/40/cover500/k892839663_2.jpg',
  createdAt: '2026-02-08T13:30:49',
  writer: {
    id: 'cb09d2d9-fa06-11f0-b313-961215ac38c3',
    email: 'tester001@bob.com',
    nickname: 'tester001',
  },
  reports: {
    count: 3,
    reasons: ['욕설/비방', '광고/홍보'],
  },
  managerNickname: 'manager001',
  previousStatus: 'PENDING',
  memo: null,
  processedAt: '2026-02-08T13:30:49',
} as const;

const options = ['BANNED', 'ACTIVE', 'DEACTIVATED'] as const;

const PostDetail = ({ id }: { id: number }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [statusValue, setStatusValue] = useState<AdminPostStatus>('PENDING');
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
    if (data && (data.status === 'ACTIVE' || data.status === 'DEACTIVATED'))
      return;
    setIsOpenDropdown((prev) => !prev);
  }

  function handleClickStatus(value: AdminPostStatus) {
    setStatusValue(value);
    setIsOpenDropdown(false);
  }
  function handleChangeStatus() {
    console.log(statusValue, memoText);
  }
  return (
    <C.Container>
      <C.Header>
        <C.Title>게시글 상세</C.Title>
        <C.StatusBox $status={data.status}>
          {adminPostStatusMap[data.status]}
        </C.StatusBox>
      </C.Header>
      <C.ContentWrapper>
        <C.LeftSection>
          <C.Section>
            <C.SectionTitle>작성자 정보</C.SectionTitle>
            <C.InfoRow>
              <C.InfoLabel>닉네임</C.InfoLabel>
              <C.InfoValue>{data.writer.nickname}</C.InfoValue>
            </C.InfoRow>
            <C.InfoRow>
              <C.InfoLabel>이메일</C.InfoLabel>
              <C.InfoValue>{data.writer.email}</C.InfoValue>
            </C.InfoRow>
          </C.Section>
          <C.Section>
            <C.SectionTitle>게시글 정보</C.SectionTitle>
            <CreateTimeText>
              {formatDateTime(data.createdAt)} 작성
            </CreateTimeText>
            <PostTitleText>{data.title}</PostTitleText>
            <C.PostImageWrapper>
              <Image
                src={data.thumbnailUrl}
                fill
                style={{ objectFit: 'cover' }}
                alt={data.title}
              />
            </C.PostImageWrapper>
          </C.Section>
        </C.LeftSection>
        <C.RightSection>
          {data.reports && data.reports.count > 0 && (
            <ReportInfo>
              <ReportInfoTitle>
                누적 신고 {data.reports.count}건
              </ReportInfoTitle>
              <ReportInfoReason>
                {data.reports.reasons.join(', ')}
              </ReportInfoReason>
            </ReportInfo>
          )}
          <C.Section>
            <C.SectionTitle>상태 변경</C.SectionTitle>
            <C.InfoLabel>처리 상태</C.InfoLabel>
            <C.DropdownWrapper ref={dropdownRef}>
              <C.StatusDropdown onClick={handleClickDropdown}>
                {adminPostStatusMap[statusValue]}
                {(data.status === 'PENDING' || data.status === 'BANNED') && (
                  <DropdownIconSm />
                )}
              </C.StatusDropdown>
              {isOpenDropdown && (
                <C.DropdownItems>
                  {options.map((opt) => (
                    <C.DropdownItem
                      key={opt}
                      onClick={() => handleClickStatus(opt)}
                      $active={opt === statusValue}>
                      {adminPostStatusMap[opt]}
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
                <div>
                  {data.previousStatus && (
                    <C.InfoValue>{`${adminPostStatusMap[data.previousStatus]} -> ${adminPostStatusMap[data.status]}`}</C.InfoValue>
                  )}
                  <C.InfoValue>{data.managerNickname}</C.InfoValue>
                </div>
              </C.InfoRow>
            </C.Section>
          )}
        </C.RightSection>
      </C.ContentWrapper>
    </C.Container>
  );
};

export default PostDetail;

export const CreateTimeText = styled.div`
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;

export const PostTitleText = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 12px;
`;

export const ReportInfo = styled.div`
  background-color: ${({ theme }) => theme.colors.DANGER_100};
  padding: 12px;
  border-radius: 6px;
  border-left: 3px solid ${({ theme }) => theme.colors.DANGER};
  color: ${({ theme }) => theme.colors.DANGER_900};
`;
export const ReportInfoTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;
export const ReportInfoReason = styled.div`
  font-size: 12px;
  font-weight: 400;
`;
