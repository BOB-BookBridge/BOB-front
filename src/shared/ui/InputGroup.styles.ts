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
  font-size: 12px;
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: transparent;
`;

export const ErrorMessage = styled.p`
  color: ${colors.light.ERROR};
  font-size: 10px;
`;
