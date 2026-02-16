import styled from 'styled-components';
import { LoadingContainer, LoadingIndicator } from '@/shared/ui';
import { useInquiryQuery } from '@/entities/admin/inquirues';
import { formatDateTime } from '@/shared/lib';

const InquiryNotiModalContent = ({ refId }: { refId: number }) => {
  const { data, isPending } = useInquiryQuery(refId);

  return (
    <>
      {isPending ? (
        <LoadingContainer>
          <LoadingIndicator />
        </LoadingContainer>
      ) : (
        data &&
        data.processedAt && (
          <Container>
            <Row>
              <Title>문의 내용</Title>
              <Info>{formatDateTime(data.createdAt)}</Info>
            </Row>
            <InquiryBox>
              <InquiryTitle>{data.title}</InquiryTitle>
              <InquiryContent>{data.content}</InquiryContent>
            </InquiryBox>
            <Row>
              <Title>답변</Title>
              <Info>{formatDateTime(data.processedAt)}</Info>
            </Row>
            <ReplyBox>{data.reply}</ReplyBox>
          </Container>
        )
      )}
    </>
  );
};

export default InquiryNotiModalContent;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
`;
const Row = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
`;

const Info = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;

const InquiryBox = styled.div`
  padding: 20px 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.GRAY_300};
  margin-bottom: 20px;
  white-space: pre-wrap;
`;

const InquiryTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const InquiryContent = styled.div`
  font-size: 13px;
`;

const ReplyBox = styled.div`
  padding: 20px 12px;
  border-radius: 12px;
  font-size: 13px;
  background-color: ${({ theme }) => theme.colors.SECONDARY_200};
`;
