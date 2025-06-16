import { useState } from 'react';
import emd_areas from '@/shared/constants/emd_areas.json';
import { SelectAreaSection } from '@/shared/ui';
import * as S from './EditProfile.styles';

const EditArea = () => {
  const defaultEmdId = 309;
  const emdName = emd_areas.find((area) => area.id === defaultEmdId)?.name;
  const [emdId, setEmdId] = useState<number | undefined>();

  function handleAreaChange() {
    setEmdId(undefined);
  }

  function handleEditArea(emdId: number) {
    // 수정 api
    setEmdId(emdId);
  }

  return (
    <S.EditAreaContainer>
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontWeight: 600 }}>활동 지역</span>
        <S.InfoText>*{emdName} 인증됨 (2025.06.11)</S.InfoText>
      </div>
      <SelectAreaSection
        showEditButton={true}
        purpose='CHANGE_AREA'
        onChange={handleAreaChange}
        onSuccess={handleEditArea}
      />
    </S.EditAreaContainer>
  );
};

export default EditArea;
