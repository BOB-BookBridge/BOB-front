import { colors } from '@/shared/constants/colors';

export const shared = {
  font: {
    base: 'var(--font-pretendard), sans-serif',
  },
  breakpoints: {
    mobile: '393px',
    tablet: '744px',
    desktop: '1440px',
  },
};

export const light = {
  ...shared,
  colors: colors.light,
};

export const dark = {
  ...shared,
  colors: colors.dark,
};

export type AppTheme = typeof light;
