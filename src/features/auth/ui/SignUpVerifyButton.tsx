import { MouseEventHandler } from 'react';
import { colors } from '@/shared/constants';
import styled from 'styled-components';

const SignUpVerifyButton = ({
  text,
  disabled,
  onClick,
}: {
  text: string;
  disabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default SignUpVerifyButton;

interface ButtonProps {
  disabled: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  ${({ disabled = true }) =>
    `background-color: ${disabled ? colors.light.GRAY_300 : colors.light.SECONDARY};
  color: ${disabled ? colors.light.GRAY_500 : colors.light.WHITE};
  `}
  width: 80px;
  height: 30px;
  font-weight: 500;
  text-align: center;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 10px;
`;
