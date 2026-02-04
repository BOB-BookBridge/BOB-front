export type InquiryStatus = 'PENDING' | 'IN_REVIEW' | 'PROCESSED' | 'CLOSED';
export type InquirySearchKey = 'email';
export type InquiryStatusWithAll = InquiryStatus | 'ALL';

export interface GetInquiriesReq {
  email?: string;
  status?: InquiryStatus;
  page: number;
  size: number;
}

export interface GetInquiriesRes {
  totalCount: number;
  inquiries: GetInquiriesModel[];
}

export interface InquiryBase {
  id: number;
  status: InquiryStatus;
  title: string;
  email: string;
  managerNickname: string | null;
  createdAt: string;
  processedAt: string | null;
}

export type GetInquiriesModel = InquiryBase;

export interface GetInquiryRes extends InquiryBase {
  content: string;
  reply: string | null;
}

export interface PatchInquiryReq {
  status: InquiryStatus;
  reply?: string;
}
