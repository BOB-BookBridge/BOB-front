import DarkModeIcon from '../assets/icons/darkmode.svg';
import LightModeIcon from '../assets/icons/lightmode.svg';
import NotiIcon from '../assets/icons/noti.svg';
import UserIcon from '../assets/icons/user.svg';
import * as S from './Header.styles';
import { colors } from '../constants';

const ICON_SIZE = 24;

// zustand로 관리 예정
const isLogin = true;
const mode = 'dark';

const Header = () => {
  return (
    <S.Container>
      <S.Logo src='/logo.svg' alt='Logo' />
      <S.RightSection>
        {mode == 'dark' ? (
          <DarkModeIcon
            width={ICON_SIZE}
            height={ICON_SIZE}
            fill={colors.dark.PRIMARY}
          />
        ) : (
          <LightModeIcon
            width={ICON_SIZE}
            height={ICON_SIZE}
            fill={colors.dark.PRIMARY}
          />
        )}
        {isLogin ? (
          <S.IconGroup>
            <UserIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
              stroke={mode === 'dark' ? colors.dark.BLACK : colors.light.BLACK}
              strokeWidth={2}
              fill='none'
            />
            <NotiIcon
              width={ICON_SIZE}
              height={ICON_SIZE}
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
