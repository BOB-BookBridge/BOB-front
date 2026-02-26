export interface GetBannerNoticeRes {
  title: string;
  content: string;
  endTime: string;
  writer: {
    id: string;
    nickname: string;
  };
}

export interface PostBannerNoticeReq {
  content: string;
  endTime?: string;
}

export interface PostAlertNoticeReq {
  title: string;
  content: string;
}

export interface GetNoticeRes {
  id: number;
  writer: {
    id: string;
    nickname: string;
  };
  title: string;
  content: string;
  createdAt: string;
}
