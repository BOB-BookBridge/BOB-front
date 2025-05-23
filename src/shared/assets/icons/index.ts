'use client';
import { withIconSize } from '@/shared/lib/withIconSize';
import RawUserIcon from './user.svg';
import RawNotiIcon from './noti.svg';
import RawDarkModeIcon from './darkmode.svg';
import RawLightModeIcon from './lightmode.svg';
import RawDropdownIcon from './dropdown.svg';

export const UserIcon = withIconSize(RawUserIcon);
export const NotiIcon = withIconSize(RawNotiIcon);
export const DarkModeIcon = withIconSize(RawDarkModeIcon);
export const LightModeIcon = withIconSize(RawLightModeIcon);
export const DropdownIcon = withIconSize(RawDropdownIcon, 24);
