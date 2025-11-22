import { useState } from 'react';
import styled from 'styled-components';
import { useAreaVerify } from '@/features/auth/model/useAreaVerify';
import { AreaState } from '@/shared/model/SelectAreaSection.type';
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
}
const EditArea = ({
  emdId,
  isAuthentication,
  authenticatedAt,
  editMode,
}: EditAreaProps) => {
  const emdName = emd_areas.find((area) => area.id === emdId)?.name;
  const [selection, setSelection] = useState<AreaState>();
  const { handleAreaVerify } = useAreaVerify();

  async function handleRecertification() {
    if (!emdId) return;
    handleAreaVerify(emdId);
  }

  return (
    <S.EditAreaContainer>
      <div
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'end',
        }}>
        <SelectAreaSection
          defaultValue={emdId}
          onChange={setSelection}
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
          <RecertificationButton onClick={handleRecertification}>
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
