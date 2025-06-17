'use client';

import styled from 'styled-components';
import type { FC, SVGProps } from 'react';

export function withIconSize<T extends FC<SVGProps<SVGSVGElement>>>(
  Icon: T,
  size = 24,
) {
  return styled(Icon)`
    width: ${size}px;
    height: ${size}px;
    flex-shrink: 0;
  `;
}
