import 'styled-components';
import { lightTheme } from '../config/theme';

type AppTheme = typeof lightTheme;

declare module 'styled-components' {
  export type DefaultTheme = AppTheme;
}
