'use client';

import { SortKey } from '@/entities/listing/model/types';
import { DropdownIconSm } from '@/shared/assets/icons';
import { sortMap } from '@/shared/lib';
import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useFilterStore } from '../../../model';

const options: SortKey[] = ['RECENT', 'OLD', 'LOW_PRICE', 'HIGH_PRICE'];

const ListingSortDropdown = () => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const sort = useFilterStore((state) => state.sort);
  const { setSort } = useFilterStore();
  function handleDropdownToggle() {
    setIsOpen((prev) => !prev);
  }
  function handleDropdownOptionClick(value: SortKey) {
    setSort(value);
    setIsOpen(false);
  }
  return (
    <Container>
      <DropdownBox onClick={handleDropdownToggle}>
        <span>{sortMap[options.find((opt) => opt === sort) ?? 'RECENT']}</span>

        <DropdownIconSm style={{ fill: theme.colors.GRAY_700 }} />
      </DropdownBox>
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem
              key={option}
              selected={option === sort}
              onClick={() => handleDropdownOptionClick(option)}>
              {sortMap[option]}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </Container>
  );
};
export default ListingSortDropdown;

const Container = styled.div`
  position: relative;
  width: 100px;
  display: flex;
  align-items: center;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;

const DropdownBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  font-weight: 500;
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
  z-index: 1000;
`;

const DropdownItem = styled.div<{ selected: boolean }>`
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px;
  font-weight: ${({ selected }) => (selected ? 500 : 400)};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.GRAY_700 : theme.colors.GRAY_500};

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_300};
  }
`;
