import styled from 'styled-components';

const DashboardHeader = () => {
  const today = new Date();
  const formatted = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return <Title>{formatted}</Title>;
};

export default DashboardHeader;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.BLACK};
`;
