export const tradeStatusMap = {
  READY: '판매 중',
  IN_PROGRESS: '거래 예약',
  COMPLETED: '거래 완료',
} as const;

export const bookStatusMap = {
  BEST: '최상',
  HIGH: '상',
  MEDIUM: '중',
  LOW: '하',
} as const;

export const priceRangeMap: { [key: number]: string } = {
  0: '~5,000원',
  1: '5,000원~10,000원',
  2: '10,000원~20,000원',
} as const;
