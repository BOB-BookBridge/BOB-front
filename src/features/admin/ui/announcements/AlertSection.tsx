import { useState } from 'react';
import styled from 'styled-components';
import AdminTable, { ColumnConfig } from '../AdminTable';
import { Button, ModalLayout } from '@/shared/ui';
import { simpleFormatDate } from '@/shared/lib';
import { User } from '@/entities/admin/reports';
import AlertDetail from './AlertDetail';
import {
  SectionContainer,
  SectionTitle,
  StyledInput,
} from './BannerSection.styles';
const data = [
  {
    id: 1,
    writer: {
      id: '019bf8a2-ef66-7bf5-b97b-0b0047fa36fd',
      nickname: 'manager001',
    },
    title: '[공지]',
    content: '테스트 공지3',
    createdAt: '2026-02-20T00:33:06',
  },
  {
    id: 2,
    writer: {
      id: '019bf8a2-ef66-7bf5-b97b-0b0047fa36fd',
      nickname: 'manager001',
    },
    title: '[공지]',
    content: '테스트 공지2',
    createdAt: '2026-02-20T00:33:03',
  },
  {
    id: 3,
    writer: {
      id: '019bf8a2-ef66-7bf5-b97b-0b0047fa36fd',
      nickname: 'manager001',
    },
    title: '[공지]',
    content: '테스트 공지1',
    createdAt: '2026-02-20T00:32:53',
  },
];

const AlertSection = () => {
  const [isOpenWriteModal, setIsOpenWriteModal] = useState(false);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleClickDetail(value: number) {
    setIsOpenDetailModal(true);
    setSelectedNotice(value);
  }

  function handleClickAdd() {
    setIsOpenWriteModal(true);
  }

  function handleResetAll() {
    setIsOpenWriteModal(false);
    setTitle('');
    setContent('');
    setIsOpenDetailModal(false);
    setSelectedNotice(null);
  }

  function handleClickSubmit() {
    console.log(title, content);
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
      <AdminTable
        columns={columns}
        data={data.map((inq, index) => ({
          ...inq,
          number: index + 1,
        }))}
        keyExtractor={(inq) => inq.number}
        onRowClick={(inq) => handleClickDetail(inq.id)}
      />
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
      {isOpenDetailModal && selectedNotice && (
        <ModalLayout
          isOpen={isOpenDetailModal}
          title='공지 상세'
          onClose={handleResetAll}>
          <AlertDetail id={selectedNotice} />
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
