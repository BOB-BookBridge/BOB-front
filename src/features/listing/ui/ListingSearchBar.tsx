'use client';

import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { ArrowICon, DropdownIconSm } from '@/shared/assets/icons';

const options = [
  { value: 'all', label: '통합' },
  { value: 'title', label: '제목' },
  { value: 'author', label: '저자' },
];

const ListingSearchBar = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('all');
  function handleDropdownToggle() {
    setIsOpen((prev) => !prev);
  }
  function handleDropdownOptionClick(value: string) {
    setSelected(value);
    setIsOpen(false);
  }
  return (
    <Container>
      <div style={{ display: 'flex' }}>
        <DropdownWrapper>
          <KeyDropdown onClick={handleDropdownToggle}>
            <span>{options.find((opt) => opt.value === selected)?.label}</span>
            <DropdownIconSm style={{ fill: theme.colors.BLACK }} />
          </KeyDropdown>
          {isOpen && (
            <DropdownList>
              {options.map((option) => (
                <DropdownItem
                  key={option.value}
                  selected={option.value === selected}
                  onClick={() => handleDropdownOptionClick(option.value)}>
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownList>
          )}
        </DropdownWrapper>
        <span
          style={{
            color: theme.colors.GRAY_300,
            marginRight: 10,
          }}>
          |
        </span>
        <StyledInput placeholder='검색어를 입력하세요' />
      </div>
      <ArrowICon style={{ fill: theme.colors.GRAY_600 }} />
    </Container>
  );
};

export default ListingSearchBar;

const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.GRAY_300};
  border-radius: 20px;
  height: 40px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const DropdownWrapper = styled.div`
  position: relative;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const KeyDropdown = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  width: 100%;
  gap: 5px;
  cursor: pointer;
`;

const DropdownList = styled.div`
  position: absolute;
  width: 100%;
  top: 100%;
  margin-top: 10px;
  left: 0;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 10px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const DropdownItem = styled.div<{ selected: boolean }>`
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px;
  font-weight: ${({ selected }) => (selected ? 700 : 400)};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.BLACK : theme.colors.GRAY_500};

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_300};
  }
`;
const StyledInput = styled.input`
  border: none;
  outline: none;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: transparent;
  caret-color: ${({ theme }) => theme.colors.BLACK};

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.BLACK};
    -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.WHITE}
      inset;
    box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.WHITE} inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
