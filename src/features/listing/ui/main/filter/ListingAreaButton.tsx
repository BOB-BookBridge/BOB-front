'use client';

import { useEffect, useMemo, useState } from 'react';
import { DropdownIconSm, PinIcon } from '@/shared/assets/icons';
import { ModalLayout, SelectAreaSection } from '@/shared/ui';
import emd_areas from '@/shared/constants/emd_areas.json';
import { useFilterStore } from '../../../model';
import * as S from './ListingControls.styles';
import { useMyQuery } from '@/entities/user';
import { colors } from '@/shared/constants';

const ListingAreaButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: myData } = useMyQuery();
  const emdId = useFilterStore((state) => state.emdId);
  const { setEmdId } = useFilterStore();
  const [selectedEmdId, setSelectedEmdId] = useState<number>();

  const selectedName = useMemo(() => {
    const match = emd_areas.find((e) => e.id === emdId);
    return match?.name ?? '선택안함';
  }, [emdId]);

  useEffect(() => {
    if (myData) setEmdId(myData.area.emdId);
  }, [myData]);

  function handleApply() {
    if (!selectedEmdId) return;
    setEmdId(selectedEmdId);
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
        <ModalLayout
          isOpen={isOpen}
          onClose={handleButtonToggle}
          title='지역 변경'>
          <SelectAreaSection
            defaultValue={emdId}
            onChange={setSelectedEmdId}
            isResponsive={true}
          />
          <S.ConfirmButton onClick={handleApply}>적용</S.ConfirmButton>
        </ModalLayout>
      )}
    </div>
  );
};
export default ListingAreaButton;
