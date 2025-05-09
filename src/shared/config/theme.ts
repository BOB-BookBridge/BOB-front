import { colors } from '@/shared/constants/colors';

export const lightTheme = {
  colors: colors.light,
  font: {
    base: 'var(--font-pretendard), sans-serif',
  },
};

export const darkTheme = {
  colors: colors.dark,
  font: {
    base: 'var(--font-pretendard), sans-serif',
  },
};

export type AppTheme = typeof lightTheme;
