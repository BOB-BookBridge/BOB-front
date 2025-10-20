import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 10px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0;
  }
`;

export const SectionContainer = styled.div`
  width: 100%;
  padding: 20px;
  max-width: 800px;
  border-radius: 20px;
  border: ${({ theme }) => `1px ${theme.colors.GRAY_300} solid`};
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PriofileSectionContainer = styled(SectionContainer)`
  flex-direction: row;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const AccountText = styled.div<{
  $isGray?: boolean;
  $isButton?: boolean;
}>`
  font-size: 14px;
  flex-shrink: 0;
  white-space: nowrap;
  color: ${({ theme, $isGray }) =>
    $isGray ? theme.colors.GRAY_700 : theme.colors.BLACK};
  cursor: ${({ $isButton }) => ($isButton ? 'pointer' : 'none')};
  padding: ${({ $isButton }) => ($isButton ? '10px 0' : '0')};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 12px;
  }
`;

export const AccountTitleText = styled(AccountText)`
  width: 150px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100px;
  }
`;

export const PasswordForm = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  gap: 20px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-top: 0;
  }
`;

export const Actions = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  max-width: 800px;
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

export const InfoText = styled.span<{ $isAuthentication: boolean }>`
  margin-left: 10px;
  color: ${({ theme, $isAuthentication }) =>
    $isAuthentication ? theme.colors.GRAY_600 : theme.colors.BADGE};
  font-size: 14px;
`;

export const Footer = styled.div`
  height: 150px;
`;
