import styled from 'styled-components';
import { colors } from '../constants';

const BUTTON_STYLE = {
  sm: { width: '180px', height: '50px', fontSize: '14px' },
  md: { width: '300px', height: '50px', fontSize: '16px' },
  lg: { width: '370px', height: '50px', fontSize: '18px' },
} as const;

const Button = ({
  text,
  disabled,
  size,
}: {
  text: string;
  disabled: boolean;
  size?: Size;
}) => {
  return (
    <StyledButton disabled={disabled} size={size}>
      {text}
    </StyledButton>
  );
};

export default Button;

type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  disabled: boolean;
  size?: Size;
}

const StyledButton = styled.button<ButtonProps>`
  ${({ size = 'md' }) => {
    const style = BUTTON_STYLE[size];
    return `
    max-width: ${style.width};
    height: ${style.height};
    line-height: ${style.height};
    font-size: ${style.fontSize};
  `;
  }}
  ${({ disabled = true }) =>
    `background-color: ${disabled ? colors.light.GRAY_300 : colors.light.PRIMARY};
  color: ${disabled ? colors.light.GRAY_500 : colors.light.WHITE};
  `}
  width: 100%;
  font-weight: 700;
  text-align: center;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;
