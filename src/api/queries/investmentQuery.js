import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createInvestment,
  getInvestmentList
} from '../../api/InvestmentService';

// 투자 현황 전체 조회
export const useGetInvestmentList = ({
  currentPage,
  pageSize,
  order,
  sort
}) => {
  return useQuery({
    queryKey: ['investment-list', { currentPage, order, sort }],
    queryFn: () =>
      getInvestmentList({ page: currentPage, limit: pageSize, order, sort }),
    keepPreviousData: true
  });
};

// 투자하기
export const useCreateInvestment = (startupId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (investment) => createInvestment(investment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['startup-list', startupId] });
    },
    onError: (error) => {
      console.error('투자 실패하였습니다.', error.message);
    }
  });
};
