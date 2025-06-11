import styled from 'styled-components';

export const NicknameSection = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 10px;
  align-items: start;
`;

export const ButtonWrapper = styled.div`
  width: 100px;
`;

export const EditAreaContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

export const AreaInfoBar = styled.div`
  display: flex;
  margin-top: 10px;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const InfoText = styled.div`
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.GRAY_600};
  font-size: 15px;
`;
