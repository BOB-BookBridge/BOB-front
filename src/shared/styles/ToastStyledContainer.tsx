'use client';

import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

const ToastStyledContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    font-size: 14px;
    white-space: pre-line;
  }
  .Toastify__toast-body {
  }
`;

export default ToastStyledContainer;
