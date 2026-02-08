export type ReportStatus =
  | 'PENDING'
  | 'IN_REVIEW'
  | 'PROCESSED'
  | 'CLOSED'
  | 'DUPLICATED';

export interface User {
  id: string;
  email: string;
  nickname: string;
}

export type ReportType = 'CHAT' | 'POST';
export type ReportTypeWithAll = ReportType | 'ALL';
export type ReportSearchKey = 'reporterEmail' | 'reportedEmail';
export type ReportStatusWithAll = ReportStatus | 'ALL';

export interface GetReportsReq {
  type?: ReportType;
  status?: ReportStatus;
  reporterEmail?: string;
  reportedEmail?: string;
  page: number;
  size: number;
}

export interface GetReportsRes {
  totalCount: number;
  reports: ReportsModel[];
}

export interface ReportsModel {
  id: number;
  status: ReportStatus;
  type: ReportType;
  reason: string;
  reporter: User;
  reported: User;
  managerNickname: string | null;
  processedAt: string | null;
  createdAt: string;
}

export type GetReportRes = GetPostReportRes | GetChatReportRes;

interface BaseReport {
  id: number;
  status: ReportStatus;
  reason: string;
  reporter: User;
  reported: User;
  managerNickname: string | null;
  processedAt: string | null;
  createdAt: string;
  reportedProcessedCount: number;
}

export interface GetPostReportRes extends BaseReport {
  type: 'POST';
  reportedContent: ReportedPost;
}

export interface GetChatReportRes extends BaseReport {
  type: 'CHAT';
  reportedContent: ReportedChat;
}
export interface ReportedPost {
  id: number;
  title: string;
  description: string | null;
  thumbnailUrl: string;
}

export interface ReportedChat {
  messages: ReportedMessage[];
}

export interface ReportedMessage {
  content: string;
  sentAt: string;
}

export interface PatchReportReq {
  status: ReportStatus;
  memo?: string;
}
