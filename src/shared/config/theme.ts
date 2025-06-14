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
  zIndex: {
    dropdown: 100,
    button: 200,
    tooltip: 300,
    fabOverlay: 400,
    fab: 500,
    overlay: 1000,
    modal: 1200,
    toast: 2000,
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
