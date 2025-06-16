'use client';

import styled from 'styled-components';
import { forwardRef, useImperativeHandle, useState } from 'react';
import sido_areas from '@/shared/constants/sido_areas.json';
import sigg_areas from '@/shared/constants/sigg_areas.json';
import emd_areas from '@/shared/constants/emd_areas.json';
import { areaVerify } from '../model/areaVerify';
import { Button, Dropdown } from '@/shared/ui';
import { colors } from '../constants';
import { useAreaSection } from '../model/useAreaSection';
import {
  SelectAreaSectionRef,
  SelectAreaSectionProps,
  AreaType,
} from '../model/SelectAreaSection.type';
import { AreaOptionsProps } from './Dropdown';

export const SelectAreaSection = forwardRef<
  SelectAreaSectionRef,
  SelectAreaSectionProps
>(
  (
    {
      showVerifyButton = true,
      showEditButton = false,
      onSuccess,
      onChange,
      purpose,
    }: SelectAreaSectionProps,
    ref,
  ) => {
    const {
      sidoId,
      siggId,
      emdId,
      isVerify,
      handleSelectSido,
      handleSelectSigg,
      handleSelectEmd,
      setIsVerify,
    } = useAreaSection(onChange);

    useImperativeHandle(ref, () => ({
      getSelection: () => ({ sidoId, siggId, emdId }),
    }));
    const [openDropdown, setOpenDropdown] = useState<string | null>('');
    const isDisabled = !sidoId || !siggId || !emdId;

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

    function handleAreaVerify() {
      if (!onSuccess || !purpose) return;
      if (!emdId) {
        console.log('위치 정보를 전부 입력해 주세요');
        return;
      }
      areaVerify({
        emdId,
        purpose,
        onSuccess: () => {
          setIsVerify(true);
          onSuccess(emdId);
        },
      });
    }

    function handleClickEdit() {
      if (onSuccess && emdId) onSuccess(emdId);
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
            placeholder={option.placeholder}
            onSelect={option.onSelect}
            onClose={() => setOpenDropdown(null)}
            selectedId={option.selectedId}
            isResponsive={!showVerifyButton}
          />
        ))}

        {showVerifyButton && (
          <StyledButton
            disabled={isDisabled || isVerify}
            onClick={handleAreaVerify}>
            {isVerify ? '인증 완료' : '위치 인증'}
          </StyledButton>
        )}
        {showEditButton && onSuccess && (
          <div style={{ width: 100 }}>
            <Button
              text='수정'
              variant={isVerify ? 'primary' : 'disabled'}
              onClick={handleClickEdit}
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
