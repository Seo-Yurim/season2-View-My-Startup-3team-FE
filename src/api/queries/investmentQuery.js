import { useQuery } from '@tanstack/react-query';
import { getInvestmentList } from '../../api/InvestmentService';

export const useGetInvestmentList = ({
  currentPage,
  pageSize,
  order,
  sort
}) => {
  return useQuery({
    queryKey: ['investment-list', { currentPage, order, sort }],
    queryFn: () =>
      getInvestmentList({ page: currentPage, limit: pageSize, order, sort })
  });
};
