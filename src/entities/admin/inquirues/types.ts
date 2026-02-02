export type InquiryStatus = 'PENDING' | 'IN_REVIEW' | 'PROCESSED' | 'CLOSED';
export type InquirySearchKey = 'email';
export type InquiryStatusWithAll = InquiryStatus | 'ALL';

export interface InquiryDetailRes {
  id: number;
  email: string;
  title: string;
  content: string;
  reply: string | null;
  status: InquiryStatus;
  managerNickname: string | null;
  processedAt: string | null;
  createdAt: string;
}
