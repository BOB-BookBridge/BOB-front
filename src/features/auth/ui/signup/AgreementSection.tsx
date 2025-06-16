import Link from 'next/link';
import { useTheme } from 'styled-components';
import * as S from './SignUpForm.styles';
import { CheckBox } from '@/shared/ui';

interface AgreementSectionProps {
  agreements: { use: boolean; info: boolean };
  isCheckedAll: boolean;
  handleToggleAll: () => void;
  handleToggle: (value: 'use' | 'info') => void;
}
const AgreementSection = ({
  agreements,
  isCheckedAll,
  handleToggleAll,
  handleToggle,
}: AgreementSectionProps) => {
  const theme = useTheme();

  return (
    <div style={{ width: '100%', maxWidth: 300 }}>
      <S.Line />
      <CheckBox
        id='all'
        checked={isCheckedAll}
        onChange={handleToggleAll}
        label={
          <>
            <p
              style={{
                fontSize: '16px',
              }}>
              전체 동의
            </p>
          </>
        }
      />
      <CheckBox
        id='use'
        checked={agreements.use}
        onChange={() => handleToggle('use')}
        label={
          <>
            <S.ImportText>[필수]</S.ImportText>
            <Link
              href='/signup/use'
              style={{
                fontSize: '14px',
                color: theme.colors.GRAY_500,
              }}>
              서비스 이용 약관
            </Link>
          </>
        }
      />
      <CheckBox
        id='info'
        checked={agreements.info}
        onChange={() => handleToggle('info')}
        label={
          <>
            <S.ImportText>[필수]</S.ImportText>
            <Link
              href='/signup/info'
              style={{
                fontSize: '14px',
                color: theme.colors.GRAY_500,
              }}>
              개인정보 수집 및 이용
            </Link>
          </>
        }
      />
    </div>
  );
};

export default AgreementSection;
