'use client';

import { useRef, useState } from 'react';
import { DropdownIconSm, PinIcon } from '@/shared/assets/icons';
import { ModalLayout, SelectAreaSection } from '@/shared/ui';
import { AreaState } from '@/shared/ui/SelectAreaSection';
import { colors } from '@/shared/constants';
import emd_areas from '@/shared/constants/emd_areas.json';
import * as S from './ListingControls.styles';

const ListingAreaButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  // #todo: 새로고침 해도 유지되도록
  const [sidoId, setSidoId] = useState<number | undefined>(undefined);
  const [siggId, setSiggId] = useState<number | undefined>(undefined);
  const [emdId, setEmdId] = useState<number | undefined>(undefined);

  // eslint 경고를 피하기 위함 나중에 삭제할 것
  void [sidoId, siggId, emdId];

  // #todo: 사용자의 인증된 위치를 기본값으로 초기화함
  const [selectedName, setSelectedName] = useState<string | undefined>(
    '선택안함',
  );
  const sectionRef = useRef<{ getSelection: () => AreaState }>(null);

  const handleApply = () => {
    const selection = sectionRef.current?.getSelection();
    console.log(selection);
    if (selection?.sidoId && selection?.siggId && selection?.emdId) {
      setSidoId(selection.sidoId);
      setSiggId(selection.siggId);
      setEmdId(selection.emdId);
      setSelectedName(
        emd_areas.find((e) => e.id === selection.emdId)?.name ?? '선택안함',
      );
      setIsOpen(false);
    }
  };

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
      <ModalLayout
        isOpen={isOpen}
        onClose={handleButtonToggle}
        title='지역 변경'>
        <SelectAreaSection ref={sectionRef} showVerifyButton={false} />
        <S.ConfirmButton onClick={handleApply}>적용</S.ConfirmButton>
      </ModalLayout>
    </div>
  );
};
export default ListingAreaButton;
