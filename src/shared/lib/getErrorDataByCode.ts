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
  400: {
    code: '400',
    message: '요청이 올바르지 않습니다. 입력값을 확인해주세요.',
  },
  401: {
    code: '401',
    message: '로그인 정보가 유효하지 않습니다. 다시 로그인 해주세요.',
    requireLogin: true,
  },
  403: {
    code: '403',
    message: '접근 권한이 없습니다. 다른 계정으로 시도해보세요.',
  },
  408: {
    code: '408',
    message: '요청이 너무 오래 걸렸습니다. 다시 시도해주세요.',
  },
  429: {
    code: '429',
    message: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
  },
  500: {
    code: '500',
    message: '문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
  },
} as const;

export const getErrorDataByCode = (error: unknown) => {
  const axiosError = error as AxiosError<{ code: number; message: string }>;
  const serverErrorData = axiosError?.response?.data ?? '';
  const httpErrorCode = axiosError?.response?.status ?? '';
  const axiosErrorCode = axiosError?.code ?? '';
  if (serverErrorData) {
    return serverErrorData;
  }
  if (httpErrorCode in ERROR_CODE) {
    return ERROR_CODE[httpErrorCode as keyof typeof ERROR_CODE];
  }
  if (axiosErrorCode in ERROR_CODE) {
    return ERROR_CODE[axiosErrorCode as keyof typeof ERROR_CODE];
  }
  return ERROR_CODE.default;
};
