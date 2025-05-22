'use client';
import styled from 'styled-components';
import { colors } from '@/shared/constants';

interface ButtonProps {
  type: 'RE-REQUEST' | 'CONFIRM';
}

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const StyledButton = styled.button<ButtonProps>`
  ${({ type, theme }) =>
    `background-color: ${type == 'RE-REQUEST' ? 'transparent' : colors.light.SECONDARY};
  color: ${type == 'RE-REQUEST' ? theme.colors.GRAY_600 : colors.light.WHITE};
  `}
  width: 50px;
  height: 30px;
  font-weight: 500;
  text-align: center;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;
