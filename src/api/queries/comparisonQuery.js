import { useQuery } from '@tanstack/react-query';
import {
  getCompareResult,
  getRecentSelection,
  getStartupList
} from '../ComparisonService';

// 전체 스타트업 목록 조회
export const useGetStartupList = ({ page, keyword }) => {
  return useQuery({
    queryKey: ['comparison-list', page, keyword],
    queryFn: () => getStartupList({ page, limit: 5, keyword }),
    keepPreviousData: true
  });
};

// 최근 선택된 스타트업 목록 조회
export const useGetRecentSelectionList = () => {
  return useQuery({
    queryKey: ['recnet-selection'],
    queryFn: () => getRecentSelection(),
    keepPreviousData: true
  });
};

// 선택한 스타트업 비교 결과 조회
export const useGetCompareResult = ({ sessionId, orderBy, sortBy }) => {
  return useQuery({
    queryKey: ['compare-result', sessionId, orderBy, sortBy],
    queryFn: () => getCompareResult({ sessionId, orderBy, sortBy }),
    keepPreviousData: true
  });
};
