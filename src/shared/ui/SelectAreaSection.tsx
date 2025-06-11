'use client';
import { forwardRef, useImperativeHandle, useState } from 'react';
import styled from 'styled-components';
import { Button, Dropdown } from '@/shared/ui';
import { colors } from '../constants';
import sido_areas from '@/shared/constants/sido_areas.json';
import sigg_areas from '@/shared/constants/sigg_areas.json';
import emd_areas from '@/shared/constants/emd_areas.json';

const AreaType: Record<number, string> = {
  1: 'sido',
  2: 'sigg',
  3: 'emd',
} as const;

export interface AreaState {
  sidoId?: number;
  siggId?: number;
  emdId?: number;
}

export interface SelectAreaSectionProps {
  showVerifyButton?: boolean;
  showEditButton?: boolean;
  onClickEdit?: () => void;
}

export interface SelectAreaSectionRef {
  getSelection: () => {
    sidoId?: number;
    siggId?: number;
    emdId?: number;
  };
}
export const SelectAreaSection = forwardRef<
  SelectAreaSectionRef,
  SelectAreaSectionProps
>(
  (
    {
      showVerifyButton = true,
      showEditButton = false,
      onClickEdit,
    }: SelectAreaSectionProps,
    ref,
  ) => {
    const [sidoId, setSidoId] = useState<number | undefined>(undefined);
    const [siggId, setSiggId] = useState<number | undefined>(undefined);
    const [emdId, setEmdId] = useState<number | undefined>(undefined);

    useImperativeHandle(ref, () => ({
      getSelection: () => ({ sidoId, siggId, emdId }),
    }));
    const [openDropdown, setOpenDropdown] = useState<string | null>('');
    const isDisabled = !sidoId || !siggId || !emdId;

    function handleToggleDropdown(value: number) {
      setOpenDropdown((prev) =>
        prev === AreaType[value] ? null : AreaType[value],
      );
    }

    // 상위 지역이 변경되면 하위 지역은 리셋되어야 함
    function handleSelectSido(value: number) {
      if (sidoId && value !== sidoId) {
        setSiggId(undefined);
        setEmdId(undefined);
      }
      setSidoId(value);
    }

    function handleSelectSigg(value: number) {
      if (siggId && value !== siggId) {
        setEmdId(undefined);
      }
      setSiggId(value);
    }

    function handleSelectEmd(value: number) {
      setEmdId(value);
    }

    function handleAreaVerify() {
      console.log(emdId);
    }

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
        }}>
        <Dropdown
          category={1}
          isOpen={openDropdown === 'sido'}
          onToggle={handleToggleDropdown}
          options={sido_areas}
          placeholder='시/도'
          onSelect={handleSelectSido}
          onClose={() => setOpenDropdown(null)}
          selectedId={sidoId}
          isResponsive={!showVerifyButton}
        />
        <Dropdown
          category={2}
          isOpen={openDropdown === 'sigg'}
          onToggle={handleToggleDropdown}
          options={sigg_areas
            .filter((value) => value.sido_area_id === sidoId)
            .sort((a, b) => a.name.localeCompare(b.name))}
          placeholder='시/군/구'
          onSelect={handleSelectSigg}
          onClose={() => setOpenDropdown(null)}
          selectedId={siggId}
          isResponsive={!showVerifyButton}
        />
        <Dropdown
          category={3}
          isOpen={openDropdown === 'emd'}
          onToggle={handleToggleDropdown}
          options={emd_areas
            .filter((value) => value.sigg_area_id == siggId)
            .sort((a, b) => a.name.localeCompare(b.name))}
          placeholder='읍/면/동'
          onSelect={handleSelectEmd}
          onClose={() => setOpenDropdown(null)}
          selectedId={emdId}
          isResponsive={!showVerifyButton}
        />
        {showVerifyButton && (
          <StyledButton disabled={isDisabled} onClick={handleAreaVerify}>
            위치 인증
          </StyledButton>
        )}
        {showEditButton && onClickEdit && (
          <div style={{ width: 100 }}>
            <Button
              text='수정'
              variant={emdId ? 'primary' : 'disabled'}
              onClick={onClickEdit}
            />
          </div>
        )}
      </div>
    );
  },
);

SelectAreaSection.displayName = 'SelectAreaSection';

const StyledButton = styled.button<{ disabled: boolean }>`
  ${({ disabled = true, theme }) =>
    `background-color: ${disabled ? theme.colors.GRAY_300 : colors.light.PRIMARY};
    color: ${disabled ? theme.colors.GRAY_500 : colors.light.WHITE};
    cursor: ${disabled ? 'default' : 'pointer'};
  `}
  width: 145px;
  height: 50px;
  font-weight: 700;
  text-align: center;
  border-radius: 10px;
  border: none;
  font-size: 15px;
`;
