export const inquiryStatusMap = {
  PENDING: '답변 대기',
  IN_REVIEW: '검토 중',
  PROCESSED: '처리 완료',
  CLOSED: '처리 불필요',
} as const;

export const memberStatusMap = {
  ACTIVE: '활성',
  BANNED: '정지',
  DEACTIVATED: '비활성',
} as const;
