import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, RenderResult } from '@testing-library/react';
import GlobalStyle from '@/shared/styles/GlobalStyles';
import { light } from '@/shared/config/theme';

export const renderWithProviders = (
  component: React.ReactElement,
): RenderResult => {
  return render(
    <ThemeProvider theme={light}>
      <GlobalStyle />
      {component}
    </ThemeProvider>,
  );
};
