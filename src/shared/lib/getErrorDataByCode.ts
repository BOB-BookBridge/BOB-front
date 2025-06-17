import { AxiosError } from 'axios';

type ErrorCodeType = {
  [key: string]: { code: string; message: string; requireLogin?: boolean };
};

export const ERROR_CODE: ErrorCodeType = {
  default: { code: 'ERROR', message: '알 수 없는 오류가 발생했습니다.' },

  // axios error
  ERR_NETWORK: {
    code: '통신 에러',
    message:
      '서버가 응답하지 않습니다. \n페이지를 재시작하거나 관리자에게 연락해 주세요.',
  },
  ECONNABORTED: {
    code: '요청 시간 초과',
    message: '요청 시간을 초과했습니다.',
  },

  // http status code 및 정의 된 코드
  400: { code: '400', message: '잘못된 요청.' },
  401: { code: '401', message: '인증 에러.', requireLogin: true },
  403: { code: '403', message: '권한이 없습니다.' },
} as const;

export const getErrorDataByCode = (error: unknown) => {
  const axiosError = error as AxiosError<{ code: number; message: string }>;
  const serverErrorCode = axiosError?.response?.data?.code ?? '';
  const httpErrorCode = axiosError?.response?.status ?? '';
  const axiosErrorCode = axiosError?.code ?? '';
  if (serverErrorCode in ERROR_CODE) {
    return ERROR_CODE[serverErrorCode as keyof typeof ERROR_CODE];
  }
  if (httpErrorCode in ERROR_CODE) {
    return ERROR_CODE[httpErrorCode as keyof typeof ERROR_CODE];
  }
  if (axiosErrorCode in ERROR_CODE) {
    return ERROR_CODE[axiosErrorCode as keyof typeof ERROR_CODE];
  }
  return ERROR_CODE.default;
};
