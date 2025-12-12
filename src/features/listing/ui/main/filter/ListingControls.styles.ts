import styled from 'styled-components';
import { colors } from '@/shared/constants';

export const StyledButton = styled.button`
  border: none;
  display: flex;
  height: 38px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.light.GRAY_400};
  color: ${colors.light.BLACK};
  border-radius: 20px;
  gap: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  padding: 10px;
  margin-right: 10px;
`;

export const FilterContentWrapper = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-height: 500px;
    justify-content: flex-start;
    margin-top: 0;
    overflow-y: auto;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => `${theme.colors.GRAY_700}`};
    border-radius: 5px;
    border-right: 1px solid transparent;
    background-clip: padding-box;
    box-sizing: border-box;
  }

  &::-webkit-scrollbar-button:vertical:start:increment,
  &::-webkit-scrollbar-button:vertical:end:decrement {
    display: block;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => `${theme.colors.GRAY_500}`};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 455px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 330px;
  }

  :first-child {
    flex: 0.5;
  }
  :last-child {
    flex: 1;
  }
`;
