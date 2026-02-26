import styled from 'styled-components';
import { formatDateTime } from '@/shared/lib';
import { useNoticeQuery } from '@/entities/admin/announcements';
import { LoadingContainer, LoadingIndicator } from '@/shared/ui';

const AlertDetail = ({ id }: { id: number }) => {
  const { isPending, data } = useNoticeQuery(id);
  return (
    <Container>
      {isPending ? (
        <LoadingContainer>
          <LoadingIndicator />
        </LoadingContainer>
      ) : (
        data && (
          <>
            <Row>
              <Title>{data.title}</Title>
              <DateTime>{formatDateTime(data.createdAt)} 작성</DateTime>
            </Row>
            <Divider />
            <Content>{data.content}</Content>
          </>
        )
      )}
    </Container>
  );
};

export default AlertDetail;

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const Title = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
`;

const DateTime = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.GRAY_300};
`;

const Content = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 400;
`;
