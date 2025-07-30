import React from 'react';
import styled, { keyframes } from 'styled-components';

export const ThinkingIndicator = () => {
  const text = '생각 중…';
  return (
    <Container aria-label='생각 중'>
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
