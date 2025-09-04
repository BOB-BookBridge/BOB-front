import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 450px;
  margin-top: 50px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 10px;
  }
`;
export const AccountText = styled.div<{
  $isButton?: boolean;
  $isGray?: boolean;
}>`
  font-size: 14px;
  color: ${({ $isGray, theme }) =>
    $isGray ? theme.colors.GRAY_600 : 'inherit'};
  cursor: ${({ $isButton }) => ($isButton ? 'pointer' : 'default')};
`;

export const NicknameSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: start;
  max-width: 390px;
`;

export const ButtonWrapper = styled.div`
  width: 100px;
`;

export const EditAreaContainer = styled.div`
  width: 100%;
`;

export const AreaInfoBar = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const InfoText = styled.span`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.GRAY_600};
  font-size: 14px;
`;

export const AccountRow = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
