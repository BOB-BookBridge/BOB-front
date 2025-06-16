'use client';
import { useEffect, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { DropdownIcon } from '../assets/icons';

export interface AreaOptionsProps {
  id: number;
  name: string;
  adm_code?: string;
  sido_area_id?: number;
  sigg_area_id?: number;
}

const Dropdown = ({
  options,
  onSelect,
  placeholder,
  category,
  isOpen,
  onToggle,
  onClose,
  selectedId,
  isResponsive = false,
}: {
  options: AreaOptionsProps[];
  onSelect: (value: number) => void;
  placeholder: string;
  category: number;
  isOpen: boolean;
  onToggle: (value: number) => void;
  onClose: () => void;
  selectedId: number | undefined;
  isResponsive?: boolean;
}) => {
  const theme = useTheme();
  const [isSelected, setIsSelected] = useState(false);
  const [selectItem, setSelectItem] = useState('');

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selectedId) {
      setSelectItem('');
      setIsSelected(false);
    }
  }, [selectedId]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  function handleClickDropdown() {
    onToggle(category);
  }

  function handleClickItem(id: number, itemName: string) {
    setIsSelected(true);
    setSelectItem(itemName);
    onToggle(category);
    onSelect(id);
  }
  return (
    <Container $isResponsive={isResponsive} ref={ref}>
      <DropdownBox onClick={handleClickDropdown}>
        <p
          style={{
            fontSize: 12,
            color: isSelected ? theme.colors.BLACK : theme.colors.GRAY_500,
          }}>
          {isSelected ? selectItem : placeholder}
        </p>
        <DropdownIcon fill={theme.colors.GRAY_500} />
      </DropdownBox>
      {isOpen && (
        <OptionsWrapper $isResponsive={isResponsive}>
          {options.length > 0 ? (
            options.map((option) => (
              <OptionBox
                key={option.id}
                onClick={() => handleClickItem(option.id, option.name)}>
                {option.name}
              </OptionBox>
            ))
          ) : (
            <OptionBox $disabled={true}>
              상위 지역을 먼저 선택해 주세요
            </OptionBox>
          )}
        </OptionsWrapper>
      )}
    </Container>
  );
};

export default Dropdown;

const Container = styled.div<{ $isResponsive: boolean }>`
  width: 145px;
  ${({ $isResponsive }) =>
    $isResponsive &&
    `
      @media (max-width: 479px) {
        width: 100px;
      }
    `}
`;
const DropdownBox = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border: ${({ theme }) => `1px solid ${theme.colors.GRAY_500}`};
  border-radius: 10px;
  cursor: pointer;
  background-color: ${({ theme }) => `${theme.colors.WHITE}`};
`;

const OptionBox = styled.div<{ $disabled?: boolean }>`
  font-size: 12px;
  padding: 3px;
  border-radius: 5px;
  height: 40px;
  display: flex;
  align-items: center;
  ${({ $disabled, theme }) =>
    !$disabled &&
    `
    cursor: pointer;
    &:hover {
      background-color: ${theme.colors.GRAY_500};
      color: ${theme.colors.BLACK};
    }
  `}
`;

const OptionsWrapper = styled.div<{ $isResponsive: boolean }>`
  padding: 2px;
  margin-top: 5px;
  max-height: 100px;
  overflow-y: scroll;
  position: absolute;
  width: 145px;
  border-radius: 5px;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  background-color: ${({ theme }) => `${theme.colors.WHITE}`};
  border: ${({ theme }) => `1px solid ${theme.colors.GRAY_500}`};

  ${({ $isResponsive }) =>
    $isResponsive &&
    `
      @media (max-width: 479px) {
        width: 100px;
      }
    `}

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => `${theme.colors.GRAY_700}`};
    border-radius: 5px;
    border-right: 1px solid transparent;
    background-clip: padding-box;
    box-sizing: border-box;
  }

  &::-webkit-scrollbar-button:vertical:start:increment,
  &::-webkit-scrollbar-button:vertical:end:decrement {
    display: block;
    height: 1px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => `${theme.colors.GRAY_500}`};
  }
`;
