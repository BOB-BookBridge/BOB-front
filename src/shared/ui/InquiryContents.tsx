import { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../constants';
import Button from './Button';

interface InquiryContentsProps {
  onClose: () => void;
}
const InquiryContents = ({ onClose }: InquiryContentsProps) => {
  const [value, setValue] = useState('');

  function handleClickInquiry() {
    onClose();
  }

  return (
    <Container>
      <InputContainer>
        <TitleArea placeholder='문의 제목을 입력해주세요' />
      </InputContainer>
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='문의 내용을 입력해주세요 (200자 내외)'
        rows={4}
      />
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

const TitleArea = styled.input`
  flex: 1;
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
