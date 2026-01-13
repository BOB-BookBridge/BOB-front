import { UserAreaModel } from '../user';

export interface GetMemberListReq {
  key?: string;
  keyword?: string;
  sort?: string;
  page: number;
  size: number;
}

export interface Member {
  id: string;
  status: MemberStatus;
  role: 'ADMIN' | 'USER';
  email: string;
  area: null | UserAreaModel;
  nickname: string;
  reportCount: number;
  memo: null | string;
  lastActiveAt: null | string;
  createdAt: string;
}

export interface GetMemberListRes {
  totalCount: number;
  members: Member[];
}

export interface PostActivity {
  count: number;
  written: number[];
}

export interface TradeActivity {
  count: number;
  sold: number[];
  bought: number[];
}

export interface ReportModel {
  count: number;
  reason: string[];
  references: number[];
}
export interface GetMemberRes {
  member: Member;
  activities: {
    post: PostActivity;
    trade: TradeActivity;
  };
  reports: {
    chat: ReportModel;
    post: ReportModel;
  };
}

export type MemberStatus = 'ACTIVE' | 'BANNED' | 'DEACTIVATED';

export interface PatchMemberReq {
  status: MemberStatus;
  memo?: string;
}
