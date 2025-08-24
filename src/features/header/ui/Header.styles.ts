import styled, { css, keyframes } from 'styled-components';
import { colors } from '../../../shared/constants';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

export const Container = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 10px;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
`;

export const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const LoginButton = styled.button`
  all: unset;
  cursor: pointer;
  border-radius: 10px;
  background-color: ${colors.light.PRIMARY};
  color: ${colors.light.WHITE};
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
`;

export const BlinkingWrap = styled.span`
  --c1: ${({ theme }) => theme.colors.BLACK};
  --c2: ${({ theme }) => theme.colors.PRIMARY};

  display: inline-flex;
  color: var(--c1);

  animation: blink-color 0.8s infinite steps(1);

  @keyframes blink-color {
    0%,
    49.9% {
      color: var(--c1);
    }
    50%,
    100% {
      color: var(--c2);
    }
  }

  & svg,
  & svg * {
    stroke: currentColor !important;
  }
`;

export const Noti = styled.div<{ $dismiss: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  padding: 10px;
  border-radius: 15px;
  max-width: 200px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${({ theme }) => theme.colors.GRAY_200};
  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${({ $dismiss }) =>
    $dismiss
      ? css`
          ${fadeOut} 0.3s ease-in forwards
        `
      : css`
          ${fadeInUp} 0.2s ease-out forwards
        `};

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_300};
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.15);
  }
`;
