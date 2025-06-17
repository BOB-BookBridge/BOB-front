import { QueryClient } from '@tanstack/react-query';
import { getErrorDataByCode } from './getErrorDataByCode';
import { toast } from 'react-toastify';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
    mutations: {
      throwOnError: false,
      onError: (error: unknown) => {
        const errorData = getErrorDataByCode(error);
        toast.error(`[${errorData.code}] ${errorData.message}`);
      },
    },
  },
});
