'use client';

import styled from 'styled-components';
import { colors } from '../constants';

const BUTTON_STYLE = {
  xs: { width: '100px', height: '30px', fontSize: '12px' },
  sm: { width: '180px', height: '45px', fontSize: '14px' },
  md: { width: '300px', height: '50px', fontSize: '16px' },
  lg: { width: '370px', height: '50px', fontSize: '18px' },
  free: { width: '100%', height: '100%', fontSize: '16px' },
} as const;

type Variant = 'primary' | 'secondary' | 'cancel' | 'disabled' | 'reject';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'free';

const Button = ({
  text,
  variant = 'primary',
  size,
  onClick,
}: {
  text: string;
  variant?: Variant;
  size?: Size;
  onClick: (e: React.MouseEvent) => void;
}) => {
  return (
    <StyledButton
      disabled={variant === 'disabled'}
      variant={variant}
      size={size}
      onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;

interface ButtonProps {
  variant: Variant;
  size?: Size;
}

const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  font-weight: 700;
  text-align: center;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  ${({ size = 'md' }) => {
    const style = BUTTON_STYLE[size];
    return `
    max-width: ${style.width};
    height: ${style.height};
    line-height: ${style.height};
    font-size: ${style.fontSize};
  `;
  }}
  ${({ theme, variant }) => {
    switch (variant) {
      case 'cancel':
        return `
          background-color: transparent;
          color: ${theme.colors.GRAY_600};
        `;
      case 'reject':
        return `
          background-color: ${theme.colors.GRAY_500};
          color: ${colors.light.WHITE};
        `;
      case 'disabled':
        return `
          background-color: ${theme.colors.GRAY_300};
          color: ${theme.colors.GRAY_500};
          cursor: not-allowed;
        `;
      case 'secondary':
        return `
          background-color: ${theme.colors.SECONDARY};
          color: ${colors.light.WHITE};
        `;
      case 'primary':
      default:
        return `
          background-color: ${theme.colors.PRIMARY};
          color: ${colors.light.WHITE};
        `;
    }
  }}
`;
