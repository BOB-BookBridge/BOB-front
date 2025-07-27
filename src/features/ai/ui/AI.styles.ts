import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 60px);
  overflow: hidden;
`;

export const Notice = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const InputWrapper = styled.div<{ $isActivate: boolean }>`
  width: 90%;
  flex: 1;
  margin: 0 10px;
  padding: 5px 8px;
  border: 1px ${({ theme }) => theme.colors.GRAY_400} solid;
  border-radius: 18px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: ${({ $isActivate }) => ($isActivate ? '20px' : '150px')};
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 80%;
  }
`;

export const Input = styled.input`
  width: 100%;
  flex: 1;
  border: none;
  outline: none;
  padding: 12px;
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
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  padding-left: 2px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.GRAY_800};
`;

export const ChatScrollWrapper = styled.div`
  flex: 1;
  width: 100%;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-bottom: 80px;

  scrollbar-gutter: stable;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.GRAY_300};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_500};
  }
`;

export const Chats = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 80%;
  }
`;
