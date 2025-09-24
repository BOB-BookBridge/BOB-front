import { toast } from 'react-toastify';
import emd_areas from '@/shared/constants/emd_areas.json';
import { formatDate, queryClient } from '@/shared/lib';
import { SelectAreaSection } from '@/shared/ui';
import * as S from './EditProfile.styles';

interface EditAreaProps {
  emdId: number;
  isAuthentication: boolean;
  authenticatedAt: string;
}
const EditArea = (area: EditAreaProps) => {
  const defaultEmdId = area.emdId;
  const emdName = emd_areas.find((area) => area.id === defaultEmdId)?.name;

  function handleEditArea() {
    queryClient.invalidateQueries({ queryKey: ['my'] });
  }
  return (
    <S.EditAreaContainer>
      <div style={{ marginBottom: 10 }}>
        <span style={{ fontWeight: 600 }}>활동 지역</span>
        <S.InfoText $isAuthentication={area.isAuthentication}>
          {area.isAuthentication
            ? `*${emdName} 인증됨 (${formatDate(area.authenticatedAt)})`
            : `*위치 인증이 필요합니다`}
        </S.InfoText>
      </div>
      <SelectAreaSection purpose='CHANGE_AREA' onSuccess={handleEditArea} />
    </S.EditAreaContainer>
  );
};

export default EditArea;
