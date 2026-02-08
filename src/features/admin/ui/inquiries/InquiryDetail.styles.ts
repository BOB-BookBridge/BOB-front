import styled from 'styled-components';
import { InquiryStatus } from '@/entities/admin/inquirues';
import { STATUS_STYLE_MAP } from '../../constants/status_style';

export const StatusDropdown = styled.div<{ $status: InquiryStatus }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: ${({ $status }) =>
    $status !== 'PROCESSED' ? '8px 8px 8px 12px' : '8px'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  min-width: 85px;
  border: none;
  appearance: none;
  color: ${({ $status, theme }) =>
    theme.colors[STATUS_STYLE_MAP[$status].color]};
  background-color: ${({ $status, theme }) =>
    theme.colors[STATUS_STYLE_MAP[$status].backgroundColor]};
  cursor: ${({ $status }) =>
    $status !== 'PROCESSED' ? 'pointer' : 'not-allowed'};
  svg {
    fill: currentColor;
  }
`;

export const DropdownItems = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  margin: 4px 0;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 4px 4px 4px ${({ theme }) => theme.colors.GRAY_500};
`;

export const DropdownItem = styled.div<{ $active: boolean }>`
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.BLACK : theme.colors.GRAY_500};
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_300};
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
`;

export const InfoItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
`;

export const IconLabel = styled.div`
  font-size: 24px;
  flex-shrink: 0;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InquiryTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.BLACK};
  margin-bottom: 12px;
`;

export const AnswerDate = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_600};
  font-weight: 400;
`;

export const ReplyForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ReplyTextarea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  border-radius: 8px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  color: ${({ theme }) => theme.colors.BLACK};
  resize: none;
  font-family: inherit;
  line-height: 1.6;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.SECONDARY};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_500};
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;
