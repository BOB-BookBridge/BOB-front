'use client';

import { useState } from 'react';
import styled from 'styled-components';
import CheckCircle from './CheckCircle';
import { showToast } from '../lib';
import Button from './Button';

export const REPORT_REASONS = {
  ABUSE: '욕설·비방',
  HATE: '혐오·차별',
  SPAM: '광고·스팸',
  SEXUAL: '성적·선정적 콘텐츠',
  ILLEGAL: '불법/유해 콘텐츠',
  FRAUD: '사기·금전 피해 유도',
  PRIVACY: '개인정보 노출',
  FALSE_INFO: '허위 정보',
  ETC: '기타',
} as const;

export type ReportReasonKey = keyof typeof REPORT_REASONS;

export const reportReasonList = Object.keys(REPORT_REASONS) as Array<
  keyof typeof REPORT_REASONS
>;

interface ReportModalContentsProps {
  type: 'CHAT' | 'POST';
  refId: number;
  onClose: () => void;
}
const ReportModalContents = ({
  type,
  refId,
  onClose,
}: ReportModalContentsProps) => {
  const [selectedReason, setSelectedReason] = useState<ReportReasonKey>();

  function handleClickCancel() {
    onClose();
  }

  function handleClickReport() {
    if (!selectedReason) showToast.error('사유를 선택해 주세요');
    onClose();
  }

  return (
    <Container>
      {reportReasonList.map((reason) => (
        <CheckCircle
          key={reason}
          id={reason}
          checked={selectedReason === reason}
          onChange={() => setSelectedReason(reason)}
          label={
            <OptionText>{REPORT_REASONS[reason]}</OptionText>
          }></CheckCircle>
      ))}
      <ButtonWrapper>
        <Button text='취소' variant='cancel' onClick={handleClickCancel} />
        <Button text='신고' onClick={handleClickReport} />
      </ButtonWrapper>
    </Container>
  );
};

export default ReportModalContents;

export const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

export const OptionText = styled.p`
  margin: 0 5px;
`;
