import emd_areas from '@/shared/constants/emd_areas.json';
import { formatDate, queryClient } from '@/shared/lib';
import { SelectAreaSection } from '@/shared/ui';
import * as S from '../Profile.styles';

interface EditAreaProps {
  emdId: number;
  isAuthentication: boolean;
  authenticatedAt: string;
}
const EditArea = ({ area }: { area: EditAreaProps }) => {
  const defaultEmdId = area.emdId;
  const emdName = emd_areas.find((area) => area.id === defaultEmdId)?.name;

  function handleEditArea() {
    queryClient.invalidateQueries({ queryKey: ['my'] });
  }
  return (
    <S.EditAreaContainer>
      <SelectAreaSection onSuccess={handleEditArea} />
      <S.InfoText $isAuthentication={area.isAuthentication}>
        {area.isAuthentication
          ? `*${emdName} 인증됨 (${formatDate(area.authenticatedAt)})`
          : `*위치 인증이 필요합니다`}
      </S.InfoText>
    </S.EditAreaContainer>
  );
};

export default EditArea;
