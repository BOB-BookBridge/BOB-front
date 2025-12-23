export interface PostReportReq {
  reportedId: string;
  reason: REPORT_REASON;
}

export interface PostReportModel {
  id: number;
  req: PostReportReq;
}

export const reportReasonList = [
  '욕설·비방',
  '혐오·차별',
  '광고·스팸',
  '성적·선정적 콘텐츠',
  '불법/유해 콘텐츠',
  '사기·금전 피해 유도',
  '개인정보 노출',
  '허위 정보',
  '기타',
] as const;

export type REPORT_REASON = (typeof reportReasonList)[number];
