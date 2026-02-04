import { useState } from 'react';
import styled from 'styled-components';
import { DropdownIconSm } from '@/shared/assets/icons';
import { MemberStatus } from '@/entities/admin';
import { memberStatusMap } from '@/shared/lib';

const StatusDropdown = ({
  value,
  onChange,
  disabled,
}: {
  value: MemberStatus;
  onChange: (v: MemberStatus) => void;
  disabled: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (v: MemberStatus) => {
    onChange(v);
    setOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton
        disabled={disabled}
        onClick={() => !disabled && setOpen((prev) => !prev)}>
        {memberStatusMap[value]}
        {!disabled && <DropdownIconSm />}
      </DropdownButton>

      {open && !disabled && (
        <DropdownList>
          {(Object.keys(memberStatusMap) as MemberStatus[]).map((s) => (
            <DropdownItem key={s} onClick={() => handleSelect(s)}>
              {memberStatusMap[s]}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default StatusDropdown;

const DropdownContainer = styled.div`
  position: relative;
  width: 100px;
`;

const DropdownButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  background-color: ${({ theme }) => theme.colors.WHITE};
  cursor: ${({ disabled }) => (disabled ? 'basic' : 'pointer')};
  color: ${({ theme }) => theme.colors.BLACK};

  svg {
    fill: currentColor;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 4px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  background-color: ${({ theme }) => theme.colors.WHITE};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
  box-shadow: 0 4px 10px rgb(0 0 0 / 10%);
  overflow: hidden;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    background-color: #f4f4f4;
  }
`;
