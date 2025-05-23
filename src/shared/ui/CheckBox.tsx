'use client';
import styled from 'styled-components';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: React.ReactNode;
}

const CheckBox = ({ id, checked, onChange, label }: CheckboxProps) => {
  return (
    <Label htmlFor={id}>
      <HiddenCheckbox
        id={id}
        type='checkbox'
        checked={checked}
        onChange={onChange}
      />
      <CustomCircle checked={checked} />
      {label}
    </Label>
  );
};

export default CheckBox;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 3px;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const CustomCircle = styled.span<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 5px;
  background-color: ${({ checked, theme }) =>
    checked ? theme.colors.PRIMARY : theme.colors.GRAY_300};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::after {
    content: '';
    display: ${({ checked }) => (checked ? 'block' : 'none')};
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    position: absolute;
  }
`;
