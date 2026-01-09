import { useState } from 'react';
import styled from 'styled-components';
import { getAreaNameById } from '@/features/user/lib';
import { formatDate, showToast } from '@/shared/lib';
import StatusDropdown from './StatusDropdown';
import { Button } from '@/shared/ui';

const mockData = {
  member: {
    id: '019b0689-4ddd-7d0e-807a-bfcbcc682200',
    status: 'ACTIVE',
    role: 'USER',
    email: 'znight1020@naver.com',
    nickname: 'leehs',
    area: {
      emdId: 213,
      isAuthentication: true,
      authenticatedAt: '2025-12-10',
    },
    memo: '마음에 안 듦.',
    lastActiveAt: '2025-12-18T17:05:00.287672',
    createdAt: '2025-12-10T13:33:40.302565',
  },
  activity: {
    post: {
      count: 3,
      written: [1, 2, 3],
    },
    trade: {
      count: 2,
      sold: [1],
      bought: [2],
    },
  },
  reports: {
    chat: {
      count: 0,
      reason: [],
      references: [],
    },
    post: {
      count: 1,
      reason: ['부적절한 콘텐츠'],
      references: [1],
    },
  },
};

const UserDetail = ({ id }: { id: string }) => {
  const [memo, setMemo] = useState(mockData.member.memo);
  const [status, setStatus] = useState(mockData.member.status);
  const [editMode, setEditMode] = useState(false);

  function handleEditCancel() {
    setMemo(mockData.member.memo);
    setStatus(mockData.member.status);
    setEditMode(false);
  }

  function handleEditSave() {
    if (status === mockData.member.status) {
      showToast.error('활성 상태를 변경해 주세요');
      return;
    }
    if (!memo) {
      showToast.error('상태 변경 사유를 메모에 입력해 주세요');
      return;
    }
    console.log(status, memo);
    setEditMode(false);
  }
  return (
    <Container>
      <Row>
        <Title>닉네임</Title>
        <Content>{mockData.member.nickname}</Content>
      </Row>
      <Row>
        <Title>이메일</Title>
        <Content>{mockData.member.email}</Content>
      </Row>
      <Row>
        <Title>지역 정보</Title>
        <Content>
          {getAreaNameById(mockData.member.area.emdId)},{' '}
          {mockData.member.area.isAuthentication ? '인증됨' : '미인증'} (
          {formatDate(mockData.member.area.authenticatedAt)})
        </Content>
      </Row>
      <Row>
        <Title>권한</Title>
        <Content>
          {mockData.member.role === 'ADMIN' ? '관리자' : '사용자'}
        </Content>
      </Row>
      <Row>
        <Title>가입일</Title>
        <Content>{formatDate(mockData.member.createdAt)}</Content>
      </Row>
      <Row>
        <Title>최근 활동일</Title>
        <Content>{formatDate(mockData.member.lastActiveAt)}</Content>
      </Row>
      <Row>
        <Title>판매중</Title>
        <Content>{mockData.activity.post.count}건</Content>
      </Row>
      <Row>
        <Title>판매완료</Title>
        <Content>{mockData.activity.trade.sold}건</Content>
      </Row>
      <Row>
        <Title>구매완료</Title>
        <Content>{mockData.activity.trade.bought}건</Content>
      </Row>
      <Row>
        <Title>신고 및 제재</Title>
        <Content>
          <div>게시글 신고 {mockData.reports.post.count}회</div>
          {mockData.reports.post.count > 0 && (
            <InfoText>사유: {mockData.reports.post.reason.join(', ')}</InfoText>
          )}
          <div>채팅 신고 {mockData.reports.chat.count}회</div>
          {mockData.reports.chat.count > 0 && (
            <InfoText>사유: {mockData.reports.chat.reason.join(', ')}</InfoText>
          )}
        </Content>
      </Row>
      <Row>
        <Title>활성상태</Title>
        <Content>
          <StatusDropdown
            value={status}
            onChange={setStatus}
            disabled={!editMode}
          />
        </Content>
      </Row>
      <Row>
        <Title>메모</Title>
        <Content>
          <MemoBox
            value={memo}
            disabled={!editMode}
            maxLength={200}
            onChange={(e) => setMemo(e.target.value)}
            placeholder='활성상태 변경 시 변경 사유를 입력해 주세요'
          />
        </Content>
      </Row>

      {!editMode ? (
        <ButtonWrapper>
          <Button
            text='수정'
            onClick={() => setEditMode(true)}
            size='sm'
            variant='secondary'
          />{' '}
        </ButtonWrapper>
      ) : (
        <ButtonWrapper>
          <Button
            text='취소'
            onClick={handleEditCancel}
            size='sm'
            variant='cancel'
          />{' '}
          <Button
            text='저장'
            onClick={handleEditSave}
            size='sm'
            variant='secondary'
          />
        </ButtonWrapper>
      )}
    </Container>
  );
};

export default UserDetail;

const Container = styled.div`
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.div`
  display: flex;
  font-size: 13px;
`;

const Title = styled.div`
  width: 100px;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;

const Content = styled.div`
  flex: 1;
`;

const InfoText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_600};
  margin: 4px 8px;
`;

const MemoBox = styled.textarea`
  width: 100%;
  resize: none;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  background-color: transparent;
  outline: none;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.BLACK};
  min-height: 120px;
  line-height: 1.5;
  resize: none;
  overflow: hidden;

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_500};
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;
