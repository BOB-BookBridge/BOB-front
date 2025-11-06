import styled from 'styled-components';

export const Container = styled.div`
  max-width: 370px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
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

export const OptionText = styled.p`
  margin: 0 5px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const DropdownBox = styled.button`
  width: 150px;
  height: 50px;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.colors.GRAY_500}`};
  border-radius: 10px;
  cursor: pointer;
  background-color: ${({ theme }) => `${theme.colors.WHITE}`};
`;

export const OptionBox = styled.div<{ $disabled?: boolean }>`
  font-size: 12px;
  padding: 3px;
  border-radius: 5px;
  height: 40px;
  display: flex;
  align-items: center;
  ${({ $disabled, theme }) =>
    !$disabled &&
    `
    cursor: pointer;
    &:hover {
      background-color: ${theme.colors.GRAY_500};
      color: ${theme.colors.BLACK};
    }
  `}
`;

export const OptionsWrapper = styled.div`
  padding: 2px;
  margin-top: 5px;
  max-height: 200px;
  overflow-y: scroll;
  position: absolute;
  width: 150px;
  border-radius: 5px;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  background-color: ${({ theme }) => `${theme.colors.WHITE}`};
  border: ${({ theme }) => `1px solid ${theme.colors.GRAY_500}`};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => `${theme.colors.GRAY_700}`};
    border-radius: 5px;
    border-right: 1px solid transparent;
    background-clip: padding-box;
    box-sizing: border-box;
  }

  &::-webkit-scrollbar-button:vertical:start:increment,
  &::-webkit-scrollbar-button:vertical:end:decrement {
    display: block;
    height: 1px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => `${theme.colors.GRAY_500}`};
  }
`;

export const WishOnlySection = styled.div`
  width: 100%;
`;
