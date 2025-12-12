'use client';

import { useEffect, useState } from 'react';
import { DropdownIconSm, PinIcon } from '@/shared/assets/icons';
import { Button, ModalLayout, SelectAreaSection } from '@/shared/ui';
import emd_areas from '@/shared/constants/emd_areas.json';
import { useFilterStore } from '../../../model';
import * as S from './ListingControls.styles';
import { useMyQuery } from '@/entities/user';
import { colors } from '@/shared/constants';

const ListingAreaButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: myData } = useMyQuery(true);
  const emdId = useFilterStore((state) => state.emdId);
  const { setEmdId } = useFilterStore();
  const [selectedEmdId, setSelectedEmdId] = useState<number>();

  const selectedName =
    emd_areas.find((e) => e.id === emdId)?.name ?? '선택안함';

  useEffect(() => {
    if (!myData) {
      setEmdId(undefined);
    }
    if (!emdId && myData) setEmdId(myData.area.emdId);
  }, [myData]);

  function handleApply() {
    if (!selectedEmdId) return;
    setEmdId(selectedEmdId);
    setIsOpen(false);
  }

  function handleReset() {
    setEmdId(undefined);
    setIsOpen(false);
  }

  function handleButtonToggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div>
      <S.StyledButton onClick={handleButtonToggle}>
        <PinIcon />
        <p style={{ margin: 0 }}>{selectedName}</p>
        <DropdownIconSm fill={colors.light.BLACK} />
      </S.StyledButton>
      {isOpen && (
        <ModalLayout isOpen={isOpen} onClose={handleReset} title='지역 변경'>
          <SelectAreaSection
            defaultValue={emdId}
            onChange={setSelectedEmdId}
            isResponsive={true}
          />
          <S.ButtonWrapper>
            <Button text='선택안함' onClick={handleReset} variant='cancel' />
            <Button text='적용' onClick={handleApply} />
          </S.ButtonWrapper>
        </ModalLayout>
      )}
    </div>
  );
};
export default ListingAreaButton;
