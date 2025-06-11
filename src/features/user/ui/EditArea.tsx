import { useRef, useState } from 'react';
import { AreaState } from '@/shared/ui/SelectAreaSection';
import emd_areas from '@/shared/constants/emd_areas.json';
import { SelectAreaSection } from '@/shared/ui';
import * as S from './EditProfile.styles';

const EditArea = () => {
  const defaultEmdId = 309;
  const emdName = emd_areas.find((area) => area.id === defaultEmdId)?.name;
  const sectionRef = useRef<{ getSelection: () => AreaState }>(null);
  const [emdId, setEmdId] = useState<number | undefined>();

  function handleApply() {
    const selection = sectionRef.current?.getSelection();

    if (selection?.sidoId && selection?.siggId && selection?.emdId) {
      setEmdId(selection.emdId);
    }
  }

  function handleEditArea() {
    handleApply();
  }
  return (
    <S.EditAreaContainer>
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontWeight: 600 }}>활동 지역</span>
        <S.InfoText>*{emdName} 인증됨 (2025.06.11)</S.InfoText>
      </div>
      <SelectAreaSection
        ref={sectionRef}
        showEditButton={true}
        onClickEdit={handleEditArea}
      />
    </S.EditAreaContainer>
  );
};

export default EditArea;
