export const inquiryStatusMap = {
  PENDING: '답변 대기',
  IN_REVIEW: '검토 중',
  PROCESSED: '답변 완료',
  CLOSED: '처리 불필요',
} as const;

export const memberStatusMap = {
  ACTIVE: '활성',
  BANNED: '정지',
  DEACTIVATED: '비활성',
} as const;

export const reportStatusMap = {
  PENDING: '처리 대기',
  IN_REVIEW: '검토 중',
  PROCESSED: '처리 완료',
  CLOSED: '처리 불필요',
  DUPLICATED: '중복 신고',
};

export const reportTypeMap = {
  CHAT: '채팅 신고',
  POST: '게시글 신고',
};

export const adminPostStatusMap = {
  PENDING: '보류',
  BANNED: '제재',
};
