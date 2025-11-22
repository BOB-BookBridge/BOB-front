'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import sido_areas from '@/shared/constants/sido_areas.json';
import sigg_areas from '@/shared/constants/sigg_areas.json';
import emd_areas from '@/shared/constants/emd_areas.json';
import { useAreaSection } from '../model/useAreaSection';
import { AreaOptionsProps } from './Dropdown';
import { Dropdown } from '@/shared/ui';
import { colors } from '../constants';
import {
  AreaType,
  SelectAreaSectionProps,
} from '../model/SelectAreaSection.type';

const SelectAreaSection = ({
  defaultValue,
  isResponsive,
  onChange,
  editMode = true,
}: SelectAreaSectionProps) => {
  const {
    sidoId,
    siggId,
    emdId,
    setSidoId,
    setSiggId,
    setEmdId,
    handleSelectSido,
    handleSelectSigg,
    handleSelectEmd,
  } = useAreaSection(onChange);

  const [openDropdown, setOpenDropdown] = useState<string | null>('');

  useEffect(() => {
    if (defaultValue) {
      const emd = emd_areas.find((area) => area.id === defaultValue);
      const defaultSiggId = emd?.sigg_area_id;
      const sigg = sigg_areas.find((area) => area.id === defaultSiggId);
      const defaultSidoId = sigg?.sido_area_id;

      setEmdId(defaultValue);
      setSiggId(defaultSiggId);
      setSidoId(defaultSidoId);
    }
  }, [defaultValue]);

  const dropdownOptions = [
    {
      options: sido_areas,
      placeholder: '시/도',
      onSelect: handleSelectSido,
      selectedId: sidoId,
      filter: undefined,
    },
    {
      options: sigg_areas,
      placeholder: '시/군/구',
      onSelect: handleSelectSigg,
      selectedId: siggId,
      filter: (item: AreaOptionsProps) => item.sido_area_id === sidoId,
    },
    {
      options: emd_areas,
      placeholder: '읍/면/동',
      onSelect: handleSelectEmd,
      selectedId: emdId,
      filter: (item: AreaOptionsProps) => item.sigg_area_id == siggId,
    },
  ];

  function handleToggleDropdown(value: number) {
    setOpenDropdown((prev) =>
      prev === AreaType[value] ? null : AreaType[value],
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
      }}>
      {dropdownOptions.map((option, idx) => (
        <Dropdown
          key={idx}
          category={idx + 1}
          isOpen={openDropdown === AreaType[idx + 1]}
          onToggle={handleToggleDropdown}
          options={
            option.filter
              ? option.options
                  .filter(option.filter)
                  .sort((a, b) => a.name.localeCompare(b.name))
              : option.options
          }
          isEditable={editMode}
          placeholder={option.placeholder}
          onSelect={option.onSelect}
          onClose={() => setOpenDropdown(null)}
          selectedId={option.selectedId}
          isResponsive={isResponsive}
        />
      ))}
    </div>
  );
};

export default SelectAreaSection;

export const VerifyButton = styled.button<{ disabled: boolean }>`
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
