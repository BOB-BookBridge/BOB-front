'use client';
import styled from 'styled-components';
import { colors } from '@/shared/constants';

interface ButtonProps {
  type: 'TRANSPARENT' | 'CONFIRM';
}

export const Container = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  gap: 20px;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const StyledButton = styled.button<ButtonProps>`
  ${({ type, theme }) =>
    `background-color: ${type == 'TRANSPARENT' ? 'transparent' : colors.light.SECONDARY};
  color: ${type == 'TRANSPARENT' ? theme.colors.GRAY_600 : colors.light.WHITE};
  `}
  width: 50px;
  height: 30px;
  font-weight: 500;
  text-align: center;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.dark.GRAY_500};
  margin-bottom: 10px;
`;

export const ImportText = styled.p`
  color: ${({ theme }) => theme.colors.PRIMARY};
  font-weight: 500px;
  font-size: 12px;
`;
