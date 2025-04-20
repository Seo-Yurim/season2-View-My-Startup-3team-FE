import { useQuery } from '@tanstack/react-query';
import { getInvestors } from '../StartupDetailService';

export const useGetStartupDetail = (startupId, page, limit) => {
  return useQuery({
    queryKey: ['startup-detail', startupId, page],
    queryFn: () => getInvestors(startupId, page, limit),
    keepPreviousData: true
  });
};
