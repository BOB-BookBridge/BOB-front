import { useState } from 'react';
import styled from 'styled-components';
import { CloseIconSm } from '@/shared/assets/icons';
import { KeywordModel } from '@/entities/admin/posts';
import * as C from '../DetailPage.styles';
import { Button } from '@/shared/ui';

const data = [
  {
    id: 563,
    word: '비속어',
    predefined: false,
    createdAt: '2026-02-07T00:18:22',
    editable: true,
  },
  {
    id: 564,
    word: '심한욕',
    predefined: false,
    createdAt: '2026-02-07T00:21:23',
    editable: true,
  },
];
const KeywordManagement = () => {
  const [addKeyword, setAddKeyword] = useState('');

  function handleAddKeyword() {}

  function handleDeleteKeyword(keyword: KeywordModel) {
    if (window.confirm(`"${keyword.word}" 키워드를 삭제하시겠습니까?`)) {
    }
  }
  return (
    <C.Container>
      <C.Section>
        <C.SectionTitle>키워드 추가</C.SectionTitle>
        <KeywordInputWrapper>
          <KeywordInput
            type='text'
            value={addKeyword}
            onChange={(e) => setAddKeyword(e.target.value)}
            placeholder='탐지할 키워드를 입력하세요 (예: 카톡, 전화번호)'
          />
          <ButtonWrapper>
            <Button
              text='+ 등록'
              onClick={handleAddKeyword}
              variant='secondary'
              size='sm'
            />
          </ButtonWrapper>
        </KeywordInputWrapper>
      </C.Section>
      <C.Section>
        <C.SectionTitle>등록된 키워드</C.SectionTitle>
        <KeywordList>
          {data.map((keyword) => (
            <KeywordBox
              key={keyword.id}
              onClick={() => handleDeleteKeyword(keyword)}>
              {keyword.word} <CloseIconSm />
            </KeywordBox>
          ))}
        </KeywordList>
      </C.Section>
      <NoticeBox>
        <NoticeTitle>키워드 등록 시 유의사항</NoticeTitle>
        <NoticeContent>키워드는 대소문자를 구분하지 않습니다.</NoticeContent>
        <NoticeContent>
          키워드가 포함된 게시글은 자동으로 보류 상태가 됩니다.
        </NoticeContent>
        <NoticeContent>
          욕설·비속어 등 기본 필터링 키워드가 미리 적용되어 있습니다.
        </NoticeContent>
      </NoticeBox>
    </C.Container>
  );
};

export default KeywordManagement;

const KeywordInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const KeywordInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  max-width: 400px;
  height: 45px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_300};
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_500};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.GRAY_500};
  }
`;

const ButtonWrapper = styled.div`
  width: 100px;
`;

const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const KeywordBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 10px 8px 12px;
  border-radius: 8px;
  box-shadow: 0 0 1px 1px ${({ theme }) => theme.colors.GRAY_400};
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_300};
  }

  &:active {
    transform: scale(0.97);
  }

  svg {
    stroke: currentColor;
  }
`;

const NoticeBox = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 12px;
  border: 0.5px solid ${({ theme }) => theme.colors.SECONDARY_400};
  background-color: ${({ theme }) => theme.colors.SECONDARY_100};
  color: ${({ theme }) => theme.colors.SECONDARY};
`;

const NoticeTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const NoticeContent = styled.li`
  font-size: 13px;
  font-weight: 400;
`;
