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
