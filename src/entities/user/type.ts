export interface UserProfileProps {
  memberId: string;
  nickname: string;
  profileImageUrl: string | null;
  area: {
    emdId: number;
    isAuthentication: boolean;
    authenticatedAt: string;
  };
}
