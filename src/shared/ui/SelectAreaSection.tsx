'use client';
import { useState } from 'react';
import { Dropdown } from '@/shared/ui';
import sido_areas from '@/shared/constants/sido_areas.json';
import sigg_areas from '@/shared/constants/sigg_areas.json';
import emd_areas from '@/shared/constants/emd_areas.json';
import { colors } from '../constants';
import styled from 'styled-components';

const AreaType: Record<number, string> = {
  1: 'sido',
  2: 'sigg',
  3: 'emd',
} as const;

const SelectAreaSection = () => {
  const [sidoId, setSidoId] = useState<number | undefined>(undefined);
  const [siggId, setSiggId] = useState<number | undefined>(undefined);
  const [emdId, setEmdId] = useState<number | undefined>(undefined);

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

  function handleAreaVerify() {
    console.log(emdId);
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Dropdown
        category={1}
        isOpen={openDropdown === 'sido'}
        onToggle={handleToggleDropdown}
        options={sido_areas}
        placeholder='시/도'
        onSelect={handleSelectSido}
        onClose={() => setOpenDropdown(null)}
        selectedId={sidoId}
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
      />
      <Dropdown
        category={3}
        isOpen={openDropdown === 'emd'}
        onToggle={handleToggleDropdown}
        options={emd_areas
          .filter((value) => value.sigg_area_id == siggId)
          .sort((a, b) => a.name.localeCompare(b.name))}
        placeholder='읍/면/동'
        onSelect={(value) => setEmdId(value)}
        onClose={() => setOpenDropdown(null)}
        selectedId={emdId}
      />
      <StyledButton disabled={isDisabled} onClick={handleAreaVerify}>
        위치 인증
      </StyledButton>
    </div>
  );
};

export default SelectAreaSection;

const StyledButton = styled.button<{ disabled: boolean }>`
  ${({ disabled = true }) =>
    `background-color: ${disabled ? colors.light.GRAY_300 : colors.light.PRIMARY};
    color: ${disabled ? colors.light.GRAY_500 : colors.light.WHITE};
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
