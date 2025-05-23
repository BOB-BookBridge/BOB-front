'use client';
import styled from 'styled-components';
import { colors } from '@/shared/constants';

interface ButtonProps {
  type: 'TRANSPARENT' | 'CONFIRM';
  disabled?: boolean;
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
  width: 50px;
  height: 30px;
  font-weight: 500;
  text-align: center;
  border-radius: 10px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  ${({ type, disabled, theme }) => {
    if (disabled) {
      return `
        background-color: ${colors.light.GRAY_300};
        color: ${colors.light.GRAY_500};
      `;
    }

    return `
      background-color: ${
        type === 'TRANSPARENT' ? 'transparent' : colors.light.SECONDARY
      };
      color: ${
        type === 'TRANSPARENT' ? theme.colors.GRAY_600 : colors.light.WHITE
      };
    `;
  }}
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
