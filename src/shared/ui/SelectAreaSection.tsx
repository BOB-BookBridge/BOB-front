'use client';

import styled from 'styled-components';
import { toast } from 'react-toastify';
import { forwardRef, useImperativeHandle, useState } from 'react';
import sido_areas from '@/shared/constants/sido_areas.json';
import sigg_areas from '@/shared/constants/sigg_areas.json';
import emd_areas from '@/shared/constants/emd_areas.json';
import { useAreaMutation } from '@/entities/auth/queries';
import { useAreaSection } from '../model/useAreaSection';
import { Dropdown } from '@/shared/ui';
import { AreaOptionsProps } from './Dropdown';
import { colors } from '../constants';
import {
  SelectAreaSectionRef,
  SelectAreaSectionProps,
  AreaType,
} from '../model/SelectAreaSection.type';

export const SelectAreaSection = forwardRef<
  SelectAreaSectionRef,
  SelectAreaSectionProps
>(
  (
    {
      showVerifyButton = true,
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
    const { mutate: areaVerify } = useAreaMutation();
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

      if (!navigator.geolocation) {
        toast.error('위치 정보 불러오기를 지원하지 않습니다.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          areaVerify(
            {
              emdId,
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
              purpose,
            },
            {
              onSuccess: () => {
                setIsVerify(true);
                onSuccess(emdId);
              },
            },
          );
        },
        (err) => {
          toast.error('위치 인증에 실패했습니다. 권한을 허용해 주세요.');
        },
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
