'use client';

import styled, { useTheme } from 'styled-components';
import { ArrowICon, DropdownIconSm } from '@/shared/assets/icons';

const ListingSearchBar = () => {
  const theme = useTheme();
  return (
    <InputWrapper>
      <div style={{ display: 'flex' }}>
        <KeyDropdown>
          <span>전체</span>
          <DropdownIconSm style={{ fill: theme.colors.BLACK }} />
        </KeyDropdown>
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
    </InputWrapper>
  );
};

export default ListingSearchBar;

const InputWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.GRAY_300};
  border-radius: 20px;
  height: 40px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const KeyDropdown = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  width: 70px;
  gap: 5px;
  cursor: pointer;
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
