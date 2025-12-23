'use client';

import { useState } from 'react';
import styled from 'styled-components';
import CheckCircle from './CheckCircle';
import { showToast } from '../lib';
import Button from './Button';
import {
  REPORT_REASON,
  reportReasonList,
  useReportChatMutation,
  useReportPostMutation,
} from '@/entities/reports';

interface ReportModalContentsProps {
  type: 'CHAT' | 'POST';
  refId: number;
  reportedId: string;
  onClose: () => void;
}
const ReportModalContents = ({
  type,
  refId,
  reportedId,
  onClose,
}: ReportModalContentsProps) => {
  const [selectedReason, setSelectedReason] = useState<REPORT_REASON>();
  const { mutate: postMutation } = useReportPostMutation();
  const { mutate: chatMutation } = useReportChatMutation();

  function handleClickCancel() {
    onClose();
  }

  function successReport() {
    showToast.success('신고가 접수되었습니다.');
    onClose();
  }

  function handleClickReport() {
    if (!selectedReason) {
      showToast.error('사유를 선택해 주세요');
      return;
    }
    if (type === 'CHAT')
      chatMutation(
        {
          id: refId,
          req: { reportedId, reason: selectedReason },
        },
        {
          onSuccess: () => successReport(),
        },
      );
    if (type === 'POST')
      postMutation(
        {
          id: refId,
          req: { reportedId, reason: selectedReason },
        },
        {
          onSuccess: () => successReport(),
        },
      );
  }

  return (
    <Container>
      {reportReasonList.map((reason) => (
        <CheckCircle
          key={reason}
          id={reason}
          checked={selectedReason === reason}
          onChange={() => setSelectedReason(reason)}
          label={<OptionText>{reason}</OptionText>}></CheckCircle>
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
