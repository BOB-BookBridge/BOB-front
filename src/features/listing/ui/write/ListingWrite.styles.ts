import styled from 'styled-components';

export const Container = styled.div`
  max-width: 370px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const AddPhoto = styled.label`
  border: 1.5px solid ${({ theme }) => theme.colors.GRAY_500};
  border-radius: 20px;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
`;

export const DeleteButton = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.BLACK};
  border-radius: 50%;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 20px;
  border: 1.5px solid ${({ theme }) => theme.colors.GRAY_500};
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_500};
  padding: 10px;
`;

export const Input = styled.input`
  width: 100%;
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: transparent;
  caret-color: ${({ theme }) => theme.colors.BLACK};

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_500};
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

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  -moz-appearance: textfield;
`;

export const EnterButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const TitleSection = styled.div`
  width: 100%;
`;
export const HeaderText = styled.span`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 600;
`;

export const StatusSection = styled.div`
  width: 100%;
`;

export const DescriptionSection = styled.div`
  width: 100%;
`;

export const Textarea = styled.textarea`
  width: 100%;
  resize: none;
  border-radius: 8px;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.BLACK};
  min-height: 120px;
  line-height: 1.5;
  resize: none;
  overflow: hidden;

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_500};
  }
`;
