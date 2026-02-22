import styled from 'styled-components';

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 2px 2px ${({ theme }) => theme.colors.GRAY_300};
  margin-bottom: 20px;
`;

export const SectionTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const NoticeBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.SECONDARY_100};
  border: 0.5px solid ${({ theme }) => theme.colors.SECONDARY_400};
`;

export const NoticeLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Row = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const NoticeCircle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.SECONDARY};
`;

export const NoticeTitleText = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.SECONDARY};
  margin: 0;
`;

export const NoticeContentText = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`;

export const NoticeInfoText = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.GRAY_700};
  margin: 0;
`;

export const DeactiveButton = styled.div`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.DANGER_900};
  color: ${({ theme }) => theme.colors.DANGER_900};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
`;

export const NewBanner = styled.div`
  display: flex;
  padding: 12px;
  justify-content: space-between;
  align-items: end;
  border-radius: 12px;
  border: 0.5px solid ${({ theme }) => theme.colors.GRAY_400};
  gap: 10px;
`;

export const SubTitle = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.GRAY_700};
  margin-bottom: 4px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  border-radius: 10px;
  font-size: 13px;
  outline: none;
  background-color: ${({ theme }) => theme.colors.WHITE};
  height: 40px;
  font-family: inherit;
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY_500};
  }
`;

export const SubmitButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  height: 40px;
  width: 80px;
  background-color: ${({ theme }) => theme.colors.SECONDARY};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
`;
