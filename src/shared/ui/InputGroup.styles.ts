'use client';
import styled from 'styled-components';
import { colors } from '../constants';

interface InputWrapperProps {
  idx: number;
}

export const Container = styled.div`
  width: 100%;
  max-width: 300px;
`;

export const InputContainer = styled.div`
  border: 1px solid ${colors.light.GRAY_500};
  border-radius: 12px;
  width: 100%;
  max-width: 300px;
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  border-top: ${({ idx }) =>
    idx === 0 ? 'none' : `1px solid ${colors.light.GRAY_500}`};
  padding: 10px;
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: transparent;
  caret-color: ${({ theme }) => theme.colors.BLACK};

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

export const ErrorMessage = styled.p`
  color: ${colors.light.ERROR};
  font-size: 12px;
`;
