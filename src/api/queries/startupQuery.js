import { useQuery } from '@tanstack/react-query';
import { getInvestors } from '../StartupDetailService';

export const useGetInvestor = (startupId, page, limit) => {
  return useQuery({
    queryKey: ['startup-list', startupId, page],
    queryFn: () => getInvestors(startupId, page, limit),
    keepPreviousData: true
  });
};
