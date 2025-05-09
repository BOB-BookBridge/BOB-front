const common = {
  PRIMARY: '#FAC053',
  SECONDARY: '#003867',
  ERROR: '#FF4D4F',
};

export const colors = {
  light: {
    WHITE: '#FAFAFA',
    GRAY_200: '#F5F5F5',
    GRAY_300: '#EEEEEE',
    GRAY_400: '#E0E0E0',
    GRAY_500: '#BDBDBD',
    GRAY_600: '#9E9E9E',
    GRAY_700: '#757575',
    GRAY_800: '#616161',
    BLACK: '#424242',
    ...common,
  },
  dark: {
    WHITE: '#424242',
    GRAY_200: '#616161',
    GRAY_300: '#757575',
    GRAY_400: '#BDBDBD',
    GRAY_500: '#9E9E9E',
    GRAY_600: '#BDBDBD',
    GRAY_700: '#E0E0E0',
    GRAY_800: '#F5F5F5',
    BLACK: '#FAFAFA',
    ...common,
  },
} as const;
