'use client';
import { DashboardHeader, DashboardStatSection } from '@/features/admin/ui';
import styled from 'styled-components';

const AdminDashboardPage = () => {
  return (
    <Container>
      <DashboardHeader />
      <DashboardStatSection />
    </Container>
  );
};

export default AdminDashboardPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
