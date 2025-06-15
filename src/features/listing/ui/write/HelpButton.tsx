'use client';

import { useState } from 'react';
import styled from 'styled-components';
import {
  HelpIcon,
  HelpInactiveIcon,
  HelpDarkIcon,
  HelpInactiveDarkIcon,
} from '@/shared/assets/icons';
import { useIsMobile, useThemeStore } from '@/shared/model';

const HelpButton = ({ text }: { text: string }) => {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(false);

  const mode = useThemeStore((state) => state.mode);

  const handleEnter = () => !isMobile && setActive(true);
  const handleLeave = () => !isMobile && setActive(false);
  const handleClick = () => isMobile && setActive((prev) => !prev);

  const Help = () => {
    if (active) return mode === 'dark' ? <HelpDarkIcon /> : <HelpIcon />;
    return mode === 'dark' ? <HelpInactiveDarkIcon /> : <HelpInactiveIcon />;
  };
  return (
    <div style={{ position: 'relative' }}>
      <div
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}>
        <Help />
      </div>
      {active && (
        <TooltipBox>
          {text.split('\n').map((line, idx) => {
            return (
              <span key={line + idx}>
                {line}
                <br />
              </span>
            );
          })}
        </TooltipBox>
      )}
    </div>
  );
};

export default HelpButton;

const TooltipBox = styled.div`
  width: 300px;
  position: absolute;
  border: 1px dashed ${({ theme }) => theme.colors.GRAY_600};
  padding: 10px;
  border-radius: 20px;
  bottom: 100%;
  margin-bottom: 5px;
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.GRAY_200};
`;
