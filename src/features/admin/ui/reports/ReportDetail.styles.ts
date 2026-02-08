import styled from 'styled-components';

export const PostPreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const PostTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

export const PostContent = styled.div`
  font-size: 13px;
  font-weight: 400;
`;

export const ChatPreview = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MessageItem = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.GRAY_400};
  padding: 12px;
  border-radius: 16px;
`;

export const MessageContent = styled.div`
  font-size: 14px;
`;

export const MessageTime = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;
