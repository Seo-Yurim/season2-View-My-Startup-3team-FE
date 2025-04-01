import { useQuery } from '@tanstack/react-query';
import { getInvestmentList } from '../../api/InvestmentService';

export const useGetInvestmentList = ({ currentPage, order, sort }) => {
  return useQuery({
    queryKey: ['investment-list', { currentPage, order, sort }],
    queryFn: () =>
      getInvestmentList({ page: currentPage, limit: 10, order, sort })
  });
};
