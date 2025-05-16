import {
  DarkModeIcon,
  LightModeIcon,
  NotiIcon,
  UserIcon,
} from '../assets/icons';

import * as S from './Header.styles';
import { colors } from '../constants';

// zustand로 관리 예정
const isLogin = false;
const mode = 'dark';

const Header = () => {
  return (
    <S.Container>
      <S.Logo src='/logo-withoutletter.svg' alt='Logo' />
      <S.RightSection>
        {mode == 'dark' ? (
          <DarkModeIcon fill={colors.dark.PRIMARY} />
        ) : (
          <LightModeIcon fill={colors.dark.PRIMARY} />
        )}
        {isLogin ? (
          <S.IconGroup>
            <UserIcon
              stroke={mode === 'dark' ? colors.dark.BLACK : colors.light.BLACK}
              strokeWidth={2}
              fill='none'
            />
            <NotiIcon
              stroke={mode === 'dark' ? colors.dark.BLACK : colors.light.BLACK}
              strokeWidth={2}
              fill='none'
            />
          </S.IconGroup>
        ) : (
          <S.LoginButton>로그인</S.LoginButton>
        )}
      </S.RightSection>
    </S.Container>
  );
};

export default Header;
