export interface UserProfileProps {
  isSocial: boolean;
  email: string;
  interests: string[];
  memberId: string;
  nickname: string;
  profileImageUrl: string | null;
  area: {
    emdId: number;
    isAuthentication: boolean;
    authenticatedAt: string;
  };
}
