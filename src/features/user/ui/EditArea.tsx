import { useState } from 'react';
import emd_areas from '@/shared/constants/emd_areas.json';
import { SelectAreaSection } from '@/shared/ui';
import * as S from './EditProfile.styles';
import { formatDate } from '@/shared/lib';
import { useMyInfoMutation } from '@/entities/user';

interface EditAreaProps {
  emdId: number;
  isAuthentication: boolean;
  authenticatedAt: string;
}
const EditArea = (area: EditAreaProps) => {
  const defaultEmdId = area.emdId;
  const emdName = emd_areas.find((area) => area.id === defaultEmdId)?.name;
  const [emdId, setEmdId] = useState<number | undefined>();

  function handleAreaChange() {
    setEmdId(undefined);
  }

  const { mutate: changeArea } = useMyInfoMutation();
  function handleEditArea(emdId: number) {
    changeArea({ area: emdId });
    setEmdId(emdId);
  }

  return (
    <S.EditAreaContainer>
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontWeight: 600 }}>활동 지역</span>
        <S.InfoText>
          *{emdName} 인증됨 ({formatDate(area.authenticatedAt)})
        </S.InfoText>
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
