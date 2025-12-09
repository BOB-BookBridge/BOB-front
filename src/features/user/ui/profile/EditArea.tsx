import styled from 'styled-components';
import emd_areas from '@/shared/constants/emd_areas.json';
import { SelectAreaSection } from '@/shared/ui';
import { colors } from '@/shared/constants';
import { formatDate } from '@/shared/lib';
import * as S from '../Profile.styles';

interface EditAreaProps {
  emdId: number;
  isAuthentication: boolean;
  authenticatedAt: string;
  editMode: boolean;
  onRecertification: () => void;
  onChange: (value: number | undefined) => void;
}
const EditArea = ({
  emdId,
  isAuthentication,
  authenticatedAt,
  editMode,
  onRecertification,
  onChange,
}: EditAreaProps) => {
  const emdName = emd_areas.find((area) => area.id === emdId)?.name;

  return (
    <S.EditAreaContainer>
      <div
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'end',
        }}>
        <SelectAreaSection
          key={editMode ? 'editing' : `reset-${emdId}`}
          defaultValue={emdId}
          onChange={onChange}
          editMode={editMode}
        />
      </div>
      <div
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}>
        <S.InfoText $isAuthentication={isAuthentication}>
          {isAuthentication
            ? `*${emdName} 인증됨 (${formatDate(authenticatedAt)})`
            : `*위치 인증이 필요합니다`}
        </S.InfoText>
        {!editMode && (
          <RecertificationButton onClick={onRecertification}>
            재인증
          </RecertificationButton>
        )}
      </div>
    </S.EditAreaContainer>
  );
};

export default EditArea;

const RecertificationButton = styled.div`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.SECONDARY};
  padding: 8px 12px;
  border-radius: 12px;
  color: ${colors.light.WHITE};
  font-size: 12px;
  margin: 4px 0;
`;
