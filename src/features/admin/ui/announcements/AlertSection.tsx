import { useState } from 'react';
import styled from 'styled-components';
import { showToast, simpleFormatDate } from '@/shared/lib';
import AdminTable, { ColumnConfig } from '../AdminTable';
import { User } from '@/entities/admin/reports';
import {
  useAlertNoticesQuery,
  usePostAlertNoticeMutation,
} from '@/entities/admin/announcements';
import {
  SectionContainer,
  SectionTitle,
  StyledInput,
} from './BannerSection.styles';
import {
  Button,
  LoadingContainer,
  LoadingIndicator,
  ModalLayout,
} from '@/shared/ui';

const AlertSection = () => {
  const { isPending, data } = useAlertNoticesQuery();
  const { mutate: postAlert } = usePostAlertNoticeMutation();
  const [isOpenWriteModal, setIsOpenWriteModal] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleClickAdd() {
    setIsOpenWriteModal(true);
  }

  function handleResetAll() {
    setIsOpenWriteModal(false);
    setTitle('');
    setContent('');
  }

  function handleClickSubmit() {
    if (!title || !content) {
      showToast.error('공지를 작성해 주세요');
      return;
    } else postAlert({ title, content });
  }

  const columns: ColumnConfig[] = [
    { key: 'number', label: '번호', width: 6 },
    { key: 'title', label: '제목', width: 24 },
    { key: 'content', label: '내용', width: 40 },
    {
      key: 'writer',
      label: '작성자',
      width: 20,
      render: (writer) => (writer as User).nickname as string,
    },
    {
      key: 'createdAt',
      label: '작성일',
      width: 10,
      render: (date) => simpleFormatDate(date as string),
    },
  ];

  return (
    <SectionContainer>
      {isPending ? (
        <LoadingContainer>
          <LoadingIndicator />
        </LoadingContainer>
      ) : (
        <>
          <Row>
            <SectionTitle>🔔 알림 공지 목록</SectionTitle>
            <div style={{ width: 80 }}>
              <Button
                text='+ 공지 등록'
                onClick={handleClickAdd}
                variant='secondary'
                size='xs'
              />
            </div>
          </Row>
          {data && data.length > 0 && (
            <AdminTable
              columns={columns}
              data={data.map((inq, index) => ({
                ...inq,
                number: index + 1,
              }))}
              keyExtractor={(inq) => inq.number}
            />
          )}
        </>
      )}
      {isOpenWriteModal && (
        <ModalLayout
          isOpen={isOpenWriteModal}
          title='공지 작성'
          onClose={handleResetAll}>
          <ModalContainer>
            <StyledInput
              style={{ flex: 1 }}
              placeholder='제목을 입력해 주세요'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder='내용을 입력해 주세요'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <InfoText>*작성 즉시 모든 사용자에게 알림이 발송됩니다.</InfoText>
            <ButtonWrapper>
              <Button
                text='취소'
                variant='cancel'
                size='sm'
                onClick={handleResetAll}
              />
              <Button
                text='발송하기'
                variant='secondary'
                size='sm'
                onClick={handleClickSubmit}
              />
            </ButtonWrapper>
          </ModalContainer>
        </ModalLayout>
      )}
    </SectionContainer>
  );
};

export default AlertSection;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 20px;
  gap: 10px;
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 16px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  border-radius: 10px;
  font-size: 13px;
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

const InfoText = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.SECONDARY_400};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;
