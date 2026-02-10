import { User } from '../reports';

export type PostSearchKey = 'email';
export type AdminFilterPostStatus = 'PENDING' | 'BANNED';
export type AdminFilterPostStatusWithAll = AdminFilterPostStatus | 'ALL';
export type AdminPostStatus = 'PENDING' | 'BANNED' | 'ACTIVE' | 'DEACTIVATED';

export interface GetAdminPostsReq {
  email?: string;
  status?: AdminFilterPostStatus;
  page: number;
  size: number;
}

export interface GetAdminPostsRes {
  totalCount: number;
  posts: AdminPostsModel[];
}

export interface AdminPostsModel {
  id: number;
  title: string;
  thumbnailUrl: string;
  description: string;
  status: AdminFilterPostStatus;
  createdAt: string;
  writer: User;
}

export interface GetAdminPostRes {
  id: number;
  status: AdminPostStatus;
  title: string;
  thumbnailUrl: string;
  description: string;
  createdAt: string;
  writer: User;
  reports: {
    count: number;
    reasons: string[];
  };
  managerNickname: string | null;
  previousStatus: AdminPostStatus;
  memo: string | null;
  processedAt: string | null;
}

export interface patchAdminPostReq {
  status: AdminPostStatus;
  memo?: string;
}
