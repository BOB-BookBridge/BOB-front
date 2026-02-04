'use client';

import styled from 'styled-components';
import { Option } from '@/entities/admin';

interface StatusBarProps<T extends string = string> {
  options: Option<T | 'ALL'>[];
  selectedValue: T | 'ALL';
  onSelectedValueChange: (values: T | 'ALL') => void;
}

const StatusBar = <T extends string = string>({
  options,
  selectedValue,
  onSelectedValueChange,
}: StatusBarProps<T>) => {
  function handleCheckboxChange(value: T | 'ALL') {
    onSelectedValueChange(value);
  }

  return (
    <Container>
      {options.map((option) => {
        const isChecked = selectedValue === option.value;

        return (
          <CheckboxItem
            key={option.value}
            onClick={() => handleCheckboxChange(option.value)}>
            <CheckboxWrapper $checked={isChecked}>
              <HiddenCheckbox
                type='checkbox'
                id={option.value}
                checked={isChecked}
                onChange={() => {}}
              />
              <CustomCheckbox $checked={isChecked}>
                {isChecked && <Checkmark>✓</Checkmark>}
              </CustomCheckbox>
            </CheckboxWrapper>
            <Label>{option.label}</Label>
          </CheckboxItem>
        );
      })}
    </Container>
  );
};

export default StatusBar;

const Container = styled.div`
  width: 100%;
  position: relative;
  padding: 8px 16px;
  border-radius: 12px;
  box-shadow: 0 0 2px 2px ${({ theme }) => theme.colors.GRAY_300};
  display: flex;
  margin-bottom: 12px;
  gap: 30px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const CheckboxWrapper = styled.div<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const CustomCheckbox = styled.div<{ $checked: boolean }>`
  width: 16px;
  height: 16px;
  border: 2px solid
    ${({ $checked, theme }) =>
      $checked ? theme.colors.SECONDARY : theme.colors.GRAY_400};
  border-radius: 4px;
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.SECONDARY : 'transparent'};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.SECONDARY};
  }
`;

const Checkmark = styled.span`
  color: white;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.BLACK};
  cursor: pointer;
  user-select: none;

  &:hover {
    color: ${({ theme }) => theme.colors.SECONDARY};
  }
`;
