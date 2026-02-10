'use client';

import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { DropdownIconSm } from '@/shared/assets/icons';
import { Option } from '@/entities/admin';

interface SearchBarProps<T extends string = string> {
  options: Option[];
  searchKey: T;
  keyword: string;
  onSearchKeyChange: (key: T) => void;
  onKeywordChange: (keyword: string) => void;
}

const SearchBar = <T extends string = string>({
  options,
  searchKey,
  keyword,
  onSearchKeyChange,
  onKeywordChange,
}: SearchBarProps<T>) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdown(false);
      }
    };

    if (isOpenDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenDropdown]);

  function handleClickDropdown() {
    setIsOpenDropdown((prev) => !prev);
  }

  function handleClickDropdownItem(value: T) {
    onSearchKeyChange(value);
    setIsOpenDropdown(false);
  }

  function handleEnterInput() {
    onKeywordChange(searchKeyword.trim());
  }

  return (
    <Container ref={dropdownRef}>
      <div ref={dropdownRef}>
        <KeyDropdown onClick={handleClickDropdown}>
          {options.find((opt) => opt.value === searchKey)?.label}
          <DropdownIconSm />
        </KeyDropdown>
        {isOpenDropdown && (
          <DropdownItems>
            {options.map((opt) => (
              <DropdownItem
                key={opt.value}
                $active={opt.value === searchKey}
                onClick={() => handleClickDropdownItem(opt.value as T)}>
                {opt.label}
              </DropdownItem>
            ))}
          </DropdownItems>
        )}
      </div>
      <StyledInput
        placeholder='검색어를 입력하세요'
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.nativeEvent.isComposing === false)
            handleEnterInput();
        }}
      />
    </Container>
  );
};

export default SearchBar;

const Container = styled.div`
  width: 100%;
  position: relative;
  padding: 8px 16px;
  border-radius: 12px;
  box-shadow: 0 0 2px 2px ${({ theme }) => theme.colors.GRAY_300};
  display: flex;
  margin-bottom: 12px;
`;

const KeyDropdown = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const DropdownItems = styled.div`
  position: absolute;
  top: 100%;
  margin: 4px 0;
  left: 4px;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 4px 4px 4px ${({ theme }) => theme.colors.GRAY_500};
`;
const DropdownItem = styled.div<{ $active: boolean }>`
  cursor: pointer;
  font-size: 14px;
  padding: 4px 16px;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.BLACK : theme.colors.GRAY_500};
  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_300};
  }
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  flex: 1;
  padding: 0 12px;
  color: ${({ theme }) => theme.colors.BLACK};
  background-color: transparent;
  caret-color: ${({ theme }) => theme.colors.BLACK};

  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_500};
    opacity: 1;
  }
  &:-webkit-autofill {
    -webkit-text-fill-color: ${({ theme }) => theme.colors.BLACK};
    -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.WHITE}
      inset;
    box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.WHITE} inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;
