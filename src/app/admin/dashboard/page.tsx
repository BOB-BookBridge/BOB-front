'use client';
import dayjs from 'dayjs';
import { useState } from 'react';
import styled from 'styled-components';
import { DateRange } from '@/entities/admin/dashboard';
import { LocalErrorBoundary } from '@/shared/lib';
import {
  DashboardDatePicker,
  DashboardHeader,
  DashboardMemberSection,
  DashboardPostSection,
  DashboardStatSection,
  DashboardTradeSection,
} from '@/features/admin/ui';

const AdminDashboardPage = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: dayjs(),
    to: dayjs(),
  });

  return (
    <Container>
      <DashboardHeader />
      <LocalErrorBoundary>
        <DashboardStatSection />
      </LocalErrorBoundary>
      <DashboardDatePicker value={dateRange} onChange={setDateRange} />
      <LocalErrorBoundary>
        <DashboardMemberSection dateRange={dateRange} />
      </LocalErrorBoundary>
      <LocalErrorBoundary>
        <DashboardPostSection dateRange={dateRange} />
      </LocalErrorBoundary>
      <LocalErrorBoundary>
        <DashboardTradeSection dateRange={dateRange} />
      </LocalErrorBoundary>
    </Container>
  );
};

export default AdminDashboardPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 50px;
`;
