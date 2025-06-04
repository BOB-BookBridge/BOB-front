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

export const ConfirmButton = styled.button`
  border: none;
  display: flex;
  width: 455px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.light.PRIMARY};
  color: ${colors.light.WHITE};
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  padding: 5px;
  height: 40px;
  @media (max-width: 479px) {
    width: 330px;
  }
`;
