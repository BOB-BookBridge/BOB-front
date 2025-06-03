'use client';
import styled from 'styled-components';

interface CheckCircleProps {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: React.ReactNode;
}

const CheckBox = ({ id, checked, onChange, label }: CheckCircleProps) => {
  return (
    <Wrapper>
      <label style={{ cursor: 'pointer' }} htmlFor={id}>
        <HiddenCheckbox
          id={id}
          type='checkbox'
          checked={checked}
          onChange={onChange}
        />
        <CustomCircle checked={checked} />
      </label>
      {label}
    </Wrapper>
  );
};

export default CheckBox;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const CustomCircle = styled.span<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 10px;
  border: 5px solid
    ${({ checked, theme }) =>
      checked ? theme.colors.PRIMARY : theme.colors.GRAY_300};
  background-color: ${({ theme }) => theme.colors.GRAY_300};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
