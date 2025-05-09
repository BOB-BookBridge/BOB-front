'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
   --font-pretendard: ${({ theme }) => theme.font.base};
  }

  body {
    background-color: ${({ theme }) => theme.colors.WHITE};
    color: ${({ theme }) => theme.colors.BLACK};
    font-family: ${({ theme }) => theme.font.base};
    margin: 0;
    padding: 0;
    line-height: 1.5;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
