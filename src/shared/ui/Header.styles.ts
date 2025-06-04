'use client';
import styled from 'styled-components';
import { colors } from '../constants';

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
