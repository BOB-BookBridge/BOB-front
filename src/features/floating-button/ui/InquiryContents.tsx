'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { useInquiryMutation } from '@/entities/inquiries';
import { useMyQuery } from '@/entities/user';
import { colors } from '@/shared/constants';
import { showToast } from '@/shared/lib';
import Button from '@/shared/ui/Button';

const MAX_LENGTH = 200;
interface InquiryContentsProps {
  onClose: () => void;
}
const InquiryContents = ({ onClose }: InquiryContentsProps) => {
  const { data: myData } = useMyQuery();
  const { mutate: inquiryMutate } = useInquiryMutation();
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState(myData ? myData.email : '');
  const [content, setContent] = useState('');

  function handleClickInquiry() {
    if (!title || !email || !content) {
      showToast.error(
        `${!title ? '제목' : !email ? '이메일' : '내용'}을 입력해 주세요`,
      );
      return;
    }
    inquiryMutate(
      { email, title, content },
      {
        onSuccess: () => {
          showToast.success('문의가 접수되었습니다.');
          onClose();
        },
      },
    );
  }

  function handleChangeTextarea(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const input = e.target.value;

    const safeChars = [...input];

    if (safeChars.length <= MAX_LENGTH) {
      setContent(input);
    } else {
      setContent(safeChars.slice(0, MAX_LENGTH).join(''));
    }
  }

  return (
    <Container>
      <InputContainer>
        <InputArea
          placeholder='문의 제목을 입력해주세요'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </InputContainer>
      {!myData && (
        <InputContainer>
          <InputArea
            placeholder='답변 받을 이메일을 입력해주세요'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputContainer>
      )}
      <Textarea
        value={content}
        onChange={handleChangeTextarea}
        placeholder='문의 내용을 입력해주세요'
        rows={4}
      />
      <TextareaLength>{content.length} / 200</TextareaLength>
      <Button text='문의' onClick={handleClickInquiry} />
    </Container>
  );
};

export default InquiryContents;

const Container = styled.div`
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: end;
`;

export const InputContainer = styled.div`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${colors.light.GRAY_400};
`;

const InputArea = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 8px;
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: transparent;
  caret-color: ${({ theme }) => theme.colors.BLACK};

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_500};
    font-size: 14px;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.BLACK};
    -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.WHITE}
      inset;
    box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.WHITE} inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  resize: none;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  background-color: transparent;
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.BLACK};

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_500};
    font-size: 14px;
  }
`;

const TextareaLength = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;
