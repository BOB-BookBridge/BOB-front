import styled from 'styled-components';
import { LoadingContainer, LoadingIndicator } from '@/shared/ui';
import { useDashboardBasic } from '@/entities/admin/dashboard';
import StatCard from './StatCard';

const DashboardStatSection = () => {
  const { data, isPending } = useDashboardBasic();
  if (isPending)
    return (
      <LoadingContainer>
        <LoadingIndicator />
      </LoadingContainer>
    );

  return (
    <>
      {data && (
        <Wrapper>
          <StatCard
            label='신규 가입자'
            currentValue={data.newMembers}
            totalValue={data.totalMembers}
            variant='blue'
          />
          <StatCard
            label='게시글 등록'
            currentValue={data.newPosts}
            totalValue={data.totalPosts}
            variant='green'
          />
          <StatCard
            label='거래 수'
            currentValue={data.newTrades}
            totalValue={data.totalTrades}
            variant='purple'
          />
        </Wrapper>
      )}
    </>
  );
};

export default DashboardStatSection;

export const Wrapper = styled.div`
  display: flex;
  gap: 16px;
`;
