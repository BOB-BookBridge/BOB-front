export const STATUS_STYLE_MAP = {
  PENDING: { color: 'WARNING', backgroundColor: 'WARNING_100' },
  IN_REVIEW: { color: 'SECONDARY', backgroundColor: 'SECONDARY_100' },
  PROCESSED: { color: 'SUCCESS', backgroundColor: 'SUCCESS_100' },
  CLOSED: { color: 'GRAY_500', backgroundColor: 'GRAY_200' },
  DUPLICATED: { color: 'GRAY_500', backgroundColor: 'GRAY_200' },
  BANNED: { color: 'DANGER', backgroundColor: 'DANGER_100' },
} as const;
