import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createInvestment,
  deleteInvestment,
  getInvestmentList,
  patchInvestment
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

// 투자 수정
export const usePatchInvestment = (investorId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (investment) => patchInvestment(investorId, investment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['startup-list', investorId] });
    },
    onError: (error) => {
      console.error('투자 수정에 실패하였습니다.', error.message);
    }
  });
};

// 투자 삭제
export const useDeleteInvestment = (investorId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteInvestment(investorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['startup-list', investorId] });
    },
    onError: (error) => {
      console.error('투자 삭제에 실패하였습니다.', error.message);
    }
  });
};
