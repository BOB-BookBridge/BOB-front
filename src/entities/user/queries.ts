import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from './api';

export const useMyQuery = () => {
  return useQuery({
    queryKey: ['my'],
    queryFn: getMyProfile,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    throwOnError: false,
  });
};
