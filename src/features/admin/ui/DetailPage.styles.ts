import styled from 'styled-components';
import { AdminFilterPostStatus } from '@/entities/admin/posts';
import { ReportStatus } from '@/entities/admin/reports';
import { STATUS_STYLE_MAP } from '../constants';

export const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 100px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.GRAY_300};
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.BLACK};
  margin: 0;
`;

export const StatusBox = styled.div<{
  $status: ReportStatus | AdminFilterPostStatus;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 8px 8px 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  min-width: 85px;
  border: none;
  color: ${({ $status, theme }) =>
    theme.colors[STATUS_STYLE_MAP[$status].color]};
  background-color: ${({ $status, theme }) =>
    theme.colors[STATUS_STYLE_MAP[$status].backgroundColor]};
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

export const LeftSection = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  gap: 20px;
`;
export const RightSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
`;

export const Section = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 12px;
  box-shadow: 0 0 2px 2px ${({ theme }) => theme.colors.GRAY_300};
`;

export const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.BLACK};
  margin-bottom: 8px;
  margin-top: 0;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const InfoLabel = styled.div`
  font-size: 12px;
  width: 100px;
  color: ${({ theme }) => theme.colors.GRAY_600};
  font-weight: 400;
`;

export const InfoValue = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.BLACK};
  line-height: 1.6;
  white-space: pre-wrap;
`;

export const PostImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
`;

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const StatusDropdown = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  font-size: 14px;
  font-weight: 400;

  cursor: 'pointer' svg {
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
  font-weight: 400;
  padding: 8px;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.BLACK : theme.colors.GRAY_600};
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_300};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  border-radius: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.BLACK};
  resize: none;
  font-family: inherit;
  line-height: 1.6;
  transition: border-color 0.2s ease;
  background-color: ${({ theme }) => theme.colors.WHITE};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.GRAY_600};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_500};
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  height: 46px;
  margin-top: 12px;
`;

export const ProcessLabel = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  gap: 4px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;
