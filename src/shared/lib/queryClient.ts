import { QueryClient } from '@tanstack/react-query';
import { getErrorDataByCode } from './getErrorDataByCode';
import showToast from './showToast';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
    },
    mutations: {
      throwOnError: false,
      onError: (error: unknown) => {
        console.log(error);
        const errorData = getErrorDataByCode(error);
        showToast.error(`${errorData.detail}`);
      },
    },
  },
});
