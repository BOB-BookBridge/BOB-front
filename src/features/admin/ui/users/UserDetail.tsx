import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, LoadingContainer, LoadingIndicator } from '@/shared/ui';
import { getAreaNameById } from '@/features/user/lib';
import { formatDate, showToast } from '@/shared/lib';
import StatusDropdown from './StatusDropdown';
import {
  MemberStatus,
  useMemberDetailQuery,
  useMemberStatusMutation,
} from '@/entities/admin';

const UserDetail = ({ id }: { id: string }) => {
  const { data, isPending } = useMemberDetailQuery(id);
  const { mutate: changeStatus } = useMemberStatusMutation();
  const [memo, setMemo] = useState(data?.member.memo ?? '');
  const [status, setStatus] = useState<MemberStatus>(
    data?.member.status ?? 'DEACTIVATED',
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (data) {
      setMemo(data.member.memo ?? '');
      setStatus(data.member.status);
    }
  }, [data]);

  function handleEditCancel() {
    if (data) {
      if (data.member.memo) setMemo(data.member.memo);
      setStatus(data.member.status);
    }
    setEditMode(false);
  }
  function handleEditSave() {
    if (!data) return;
    if (status === data.member.status) {
      showToast.error('활성 상태를 변경해 주세요');
      return;
    }

    changeStatus(
      { id, req: { status, memo } },
      { onSuccess: () => setEditMode(false) },
    );
  }

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
              <Title>닉네임</Title>
              <Content>{data.member.nickname}</Content>
            </Row>
            <Row>
              <Title>이메일</Title>
              <Content>{data.member.email}</Content>
            </Row>
            <Row>
              <Title>지역 정보</Title>
              <Content>
                {data.member.area
                  ? `${getAreaNameById(data.member.area.emdId)}, 
                ${data.member.area.isAuthentication ? '인증됨' : '미인증'} (
                ${formatDate(data.member.area.authenticatedAt)})`
                  : '정보 없음'}
              </Content>
            </Row>
            <Row>
              <Title>권한</Title>
              <Content>
                {data.member.role === 'ADMIN' ? '관리자' : '사용자'}
              </Content>
            </Row>
            <Row>
              <Title>가입일</Title>
              <Content>{formatDate(data.member.createdAt)}</Content>
            </Row>
            <Row>
              <Title>최근 활동일</Title>
              <Content>
                {data.member.lastActiveAt
                  ? formatDate(data.member.lastActiveAt)
                  : '정보없음'}
              </Content>
            </Row>
            <Row>
              <Title>판매중</Title>
              <Content>{data.activities.post.count}건</Content>
            </Row>
            <Row>
              <Title>판매완료</Title>
              <Content>{data.activities.trade.sold.length}건</Content>
            </Row>
            <Row>
              <Title>구매완료</Title>
              <Content>{data.activities.trade.bought.length}건</Content>
            </Row>
            <Row>
              <Title>신고 및 제재</Title>
              <Content>
                <div>게시글 신고 {data.reports.post.count}회</div>
                {data.reports.post.count > 0 && (
                  <InfoText>
                    사유: {data.reports.post.reason.join(', ')}
                  </InfoText>
                )}
                <div>채팅 신고 {data.reports.chat.count}회</div>
                {data.reports.chat.count > 0 && (
                  <InfoText>
                    사유: {data.reports.chat.reason.join(', ')}
                  </InfoText>
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
          </>
        )
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
