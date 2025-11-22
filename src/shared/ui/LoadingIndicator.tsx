'use client';
import styled, { keyframes } from 'styled-components';

export const LoadingIndicator = ({ text }: { text: string }) => {
  return (
    <Container aria-label='로딩'>
      {Array.from(text).map((char, idx) => (
        <Char key={idx} delay={idx * 0.1}>
          {char}
        </Char>
      ))}
    </Container>
  );
};

const wave = keyframes`
  0%, 60%, 100% { transform: translateY(0); }
  30%           { transform: translateY(-6px); }
`;

const Container = styled.div`
  display: flex;
  align-items: baseline;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;

const Char = styled.span<{ delay: number }>`
  display: inline-block;
  animation: ${wave} 1s infinite ease-in-out;
  animation-delay: ${({ delay }) => `${delay}s`};
`;

export const LoadingContainer = styled.div`
  width:100%;
  height: 100%;
  display:flex:
  justify-content:center;
  align-items: center;
`;
