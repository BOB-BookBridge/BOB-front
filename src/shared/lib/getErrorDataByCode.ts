import { AxiosError } from 'axios';

interface ErrorModel {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  properties?: {
    timestamp: string;
  };
  requireLogin?: boolean;
}

type ErrorCodeMap = {
  [key: string]: {
    title: string;
    status: number;
    detail: string;
    requireLogin?: boolean;
  };
};

export const BASE_ERROR = {
  type: 'about:blank',
  instance: '',
  properties: {
    timestamp: new Date().toISOString(),
  },
};

export const ERROR_CODE: ErrorCodeMap = {
  DEFAULT: {
    title: 'UNKNOWN_ERROR',
    status: 500,
    detail: '일시적인 문제가 발생했습니다. 잠시 후 다시 이용해주세요.',
  },

  ERR_NETWORK: {
    title: 'NETWORK_ERROR',
    status: 0,
    detail:
      '네트워크 연결이 불안정합니다. 인터넷 상태를 확인한 후 다시 시도해주세요.',
  },

  ECONNABORTED: {
    title: 'TIMEOUT',
    status: 0,
    detail: '응답이 지연되고 있습니다. 네트워크 환경을 확인해주세요',
  },

  400: {
    title: 'BAD_REQUEST',
    status: 400,
    detail: '요청이 올바르지 않습니다. 요청값을 확인한 후 다시 시도해주세요.',
  },

  401: {
    title: 'UNAUTHORIZED',
    status: 401,
    detail: '로그인 정보가 만료되었습니다. 다시 로그인 해주세요.',
    requireLogin: true,
  },

  403: {
    title: 'FORBIDDEN',
    status: 403,
    detail:
      '접근 권한이 없습니다. 계정 상태를 확인하거나 다른 계정으로 로그인 해주세요.',
  },

  404: {
    title: 'NOT_FOUND',
    status: 404,
    detail:
      '요청한 정보를 찾을 수 없습니다. 주소 또는 요청 항목을 다시 확인해주세요.',
  },

  429: {
    title: 'TOO_MANY_REQUESTS',
    status: 429,
    detail: '요청이 너무 많이 발생했습니다. 잠시 후 다시 시도해주세요.',
  },

  500: {
    title: 'SERVER_ERROR',
    status: 500,
    detail: `서버에서 문제가 발생했습니다. 잠시 후 다시 이용해주세요. \n 문제가 계속되면 고객센터로 문의해주세요.`,
  },
} as const;

export const getErrorDataByCode = (error: unknown): ErrorModel => {
  const axiosError = error as AxiosError<unknown>;
  const serverErrorData = axiosError?.response?.data ?? '';
  const status = axiosError?.response?.status;
  const axiosCode = axiosError?.code;

  if (
    serverErrorData &&
    typeof serverErrorData === 'object' &&
    'title' in serverErrorData
  ) {
    return serverErrorData as ErrorModel;
  }

  if (status && ERROR_CODE[status]) {
    return {
      ...BASE_ERROR,
      ...ERROR_CODE[status],
    };
  }

  if (axiosCode && ERROR_CODE[axiosCode]) {
    return {
      ...BASE_ERROR,
      ...ERROR_CODE[axiosCode],
    };
  }

  return {
    ...BASE_ERROR,
    ...ERROR_CODE['DEFAULT'],
  };
};
