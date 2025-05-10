import 'styled-components';
import { lightTheme } from '../config/theme';

type AppTheme = typeof lightTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {
    colors: typeof lightTheme.colors;
    font: typeof lightTheme.font;
  }
}
