import { useQuery } from '@tanstack/react-query';
import { getStartupDetail, getStartupList } from '../StartupService';

// 전체 스타트업 목록 조회
export const useGetStartupList = ({ page, limit, order, sort, keyword }) => {
  return useQuery({
    queryKey: ['startup-list', page, order, sort, keyword],
    queryFn: () => getStartupList({ page, limit, order, sort, keyword }),
    keepPreviousData: true
  });
};

// 스타트업 상세 정보 조회
export const useGetStartupDetail = (startupId, { page, limit }) => {
  return useQuery({
    queryKey: ['startup-detail', startupId, page],
    queryFn: () => getStartupDetail(startupId, { page, limit }),
    keepPreviousData: true
  });
};
