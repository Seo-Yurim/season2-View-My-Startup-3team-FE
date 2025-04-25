import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  cancelCompareStartups,
  cancelMyStartup,
  getSeletedStartups,
  selectCompareStartups,
  selectMyStartup
} from '../SelectionService';

// 세션에 저장된 스타트업 불러오기
export const useGetSelectedStartups = ({ sessionId }) => {
  return useQuery({
    queryKey: ['selected-startups', sessionId],
    queryFn: () => getSeletedStartups({ sessionId }),
    keepPreviousData: true
  });
};

// 나의 스타트업 선택
export const useSelectMyStartup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, sessionId }) => selectMyStartup({ id, sessionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['selected-startups']
      });
    },
    onError: (error) => {
      console.error('내 기업 선택에 실패하였습니다.', error.message);
    }
  });
};

// 비교할 기업들 선택
export const useSelectCompareStartups = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ids, sessionId }) =>
      selectCompareStartups({ ids, sessionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['selected-startups']
      });
    },
    onError: (error) => {
      console.error('비교 기업 선택에 실패하였습니다.', error.message);
    }
  });
};

// 나의 스타트업 선택 취소
export const useCancelMyStartup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, sessionId }) => cancelMyStartup({ id, sessionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['selected-startups']
      });
    },
    onError: (error) => {
      console.error('선택한 기업 취소에 실패하였습니다.', error.message);
    }
  });
};

// 비교할 기업 선택 취소
export const useCancelCompreStartups = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ids, sessionId }) =>
      cancelCompareStartups({ ids, sessionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['selected-startups']
      });
    },
    onError: (error) => {
      console.error('선택한 기업 취소에 실패하였습니다.', error.message);
    }
  });
};
