import styled from 'styled-components';

type BarKey = 'requested' | 'accepted' | 'reserved' | 'completed';

const barColors: Record<BarKey, string> = {
  requested: '#34D399',
  accepted: '#A78BFA',
  reserved: '#F472B6',
  completed: '#60A5FA',
};

export const Wrapper = styled.div``;

export const Card = styled.div`
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.SECONDARY_300};
  border-radius: 12px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.SECONDARY};
  margin: 0;
`;

export const SuccessRate = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.SECONDARY_400};
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const RateValue = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.DASHBOARD.BLUE_300};
`;

export const BarList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const BarItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const BarMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BarLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.SECONDARY};
`;

export const BarCount = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.SECONDARY_400};
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${({ theme }) => theme.colors.SECONDARY_300};
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $percent: number; $key: BarKey }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background-color: ${({ $key }) => barColors[$key]};
  border-radius: 999px;
  transition: width 0.4s ease;
`;
