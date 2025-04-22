import { useEffect, useState } from 'react';
import { getStartupList } from '../api/StartupService';

const useFetchStartups = (
  currentPage,
  maxItems = 10,
  initialOrder = 'total_investment',
  initialSort = 'desc'
) => {
  const [startups, setStartups] = useState([]);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(initialOrder);
  const [sort, setSort] = useState(initialSort);
  const [totalCount, setTotalCount] = useState(0);

  const [search, setSearch] = useState('');
  const [showLoading, setShowLoading] = useState(false); // 로딩 화면을 표시할지 여부

  const MIN_LOADING_TIME = 1000; // 최소 로딩 시간, 로딩 화면이 짧게 깜빡이는 것을 방지

  useEffect(() => {
    const fetchStartups = async () => {
      const loadingTimer = setTimeout(() => {
        setShowLoading(true); // 최소 로딩시간이 지나면 로딩 화면 표시
      }, MIN_LOADING_TIME);

      try {
        const startupList = await getStartupList({
          currentPage,
          maxItems,
          order,
          sort,
          search
        });
        setStartups(startupList.list || []);
        setTotalCount(startupList.totalCount || 0);
      } catch (e) {
        setError('스타트업 정보를 불러오는 데 실패하였습니다');
      } finally {
        clearTimeout(loadingTimer);
        setShowLoading(false);
      }
    };
    fetchStartups();
  }, [currentPage, maxItems, order, sort, search]);

  return {
    startups,
    error,
    order,
    setOrder,
    sort,
    setSort,
    totalCount,
    setSearch,
    showLoading
  };
};

export default useFetchStartups;
