import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const BooksSection = styled.div`
  max-height: 350px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 10px;

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

export const SectionTitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_700};
`;

export const WorthSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  svg {
    fill: ${({ theme }) => theme.colors.BLACK};
  }
`;

export const Worth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const WorthText = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
`;

export const InfoText = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_600};
  align-self: center;
`;

export const BookContainer = styled.div`
  display: flex;
  position: relative;
  padding: 4px;
  gap: 8px;
`;

export const ImageWrapper = styled.div`
  width: 10%;
  aspect-ratio: 1 / 1;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

export const Meta = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_500};
`;

export const Price = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const AITrigger = styled.div<{ $openAISummary: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 12px;

  svg {
    fill: currentColor;
    ${({ $openAISummary }) => $openAISummary && `transform: rotate(180deg);`}
  }
`;

export const Summary = styled.div`
  background-color: ${({ theme }) => theme.colors.GRAY_300};
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
  font-size: 12px;
`;
