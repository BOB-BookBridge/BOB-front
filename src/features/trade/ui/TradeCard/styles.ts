'use client';
import styled from 'styled-components';

export const Container = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.GRAY_200};
  border-radius: 20px;
  gap: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.15s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 45%;
  }

  &:hover {
    transform: scale(0.98);
  }
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const RejectText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_500};
`;
export const Books = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  svg {
    fill: ${({ theme }) => theme.colors.GRAY_800};
  }
`;

export const Book = styled.div`
  position: relative;
  width: 40%;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  flex: none;
  border-radius: 12px;
  overflow: hidden;
`;

export const BookInfo = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BookTitle = styled.div`
  width: 100%;
  font-size: 12px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ButtonSection = styled.div`
  display: flex;
  align-self: end;
  width: 50%;
  gap: 4px;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 70%;
  }
`;

export const ButtonWrapper = styled.div`
  flex: 1;
`;
