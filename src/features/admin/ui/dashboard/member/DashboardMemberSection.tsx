import { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { DateRange, useDashboardMembers } from '@/entities/admin/dashboard';
import { LoadingContainer, LoadingIndicator } from '@/shared/ui';
import DashboardLineChart from './DashboardLineChart';
import DashboardBarChart from './DashboardBarChart';

interface DashboardMemberSectionProps {
  dateRange: DateRange;
}

const toQueryParam = (date: Dayjs | null) =>
  date?.format('YYYY-MM-DD') ?? undefined;

const DashboardMemberSection = ({ dateRange }: DashboardMemberSectionProps) => {
  const params = {
    from: toQueryParam(dateRange.from),
    to: toQueryParam(dateRange.to),
  };

  const { data, isPending } = useDashboardMembers(params);

  if (isPending)
    return (
      <LoadingContainer>
        <LoadingIndicator />
      </LoadingContainer>
    );

  const isDaily =
    dateRange.from !== null &&
    dateRange.to !== null &&
    dateRange.from.isSame(dateRange.to, 'day');

  return (
    <>
      {data && (
        <Wrapper>
          <ChartCard style={{ flex: 2 }}>
            <ChartTitle>방문자수</ChartTitle>
            <DashboardLineChart points={data.points} isDaily={isDaily} />
          </ChartCard>
          <ChartCard style={{ flex: 1 }}>
            <ChartTitle>회원 상태 (신규/탈퇴/정지)</ChartTitle>
            <DashboardBarChart totals={data.totals} />
          </ChartCard>
        </Wrapper>
      )}
    </>
  );
};

export default DashboardMemberSection;

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const ChartCard = styled.div`
  min-width: 0;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.SECONDARY_300};
  border-radius: 12px;
`;

const ChartTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.SECONDARY};
  margin: 0 0 20px 0;
`;
