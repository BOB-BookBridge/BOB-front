import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  gap: 16px;
`;

export const Card = styled.div`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.SECONDARY_300};
  border-radius: 12px;
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.SECONDARY};
  margin: 0 0 20px 0;
`;

export const TotalsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 24px;
`;

export const TotalItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const TotalLabel = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.SECONDARY_400};
`;

export const TotalValue = styled.span<{ $color: 'blue' | 'red' }>`
  font-size: 24px;
  font-weight: 700;
  color: ${({ $color, theme }) =>
    $color === 'blue' ? theme.colors.DASHBOARD.BLUE_300 : theme.colors.DANGER};
`;

export const CategorySection = styled.div``;

export const CategoryLabel = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.SECONDARY_400};
  margin: 0 0 10px 0;
`;

export const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const CategoryRow = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.SECONDARY};
`;

export const CategoryName = styled.span``;

export const CategoryCount = styled.span`
  color: ${({ theme }) => theme.colors.SECONDARY_400};
`;

// 지역별 분포
export const AreaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AreaItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const AreaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AreaName = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.SECONDARY};
`;

export const AreaCount = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.SECONDARY_400};
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.SECONDARY_300};
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background-color: ${({ theme }) => theme.colors.DASHBOARD.BLUE_300};
  border-radius: 999px;
  transition: width 0.4s ease;
`;

export const EmptyMessage = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;
