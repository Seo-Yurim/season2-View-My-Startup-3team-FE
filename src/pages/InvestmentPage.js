import InvestmentList from '../components/Investment/InvestmentList';
import InvestmentHeader from '../components/Investment/InvestmentHeader';
import { useState } from 'react';
import { useGetInvestmentList } from '../api/queries/investmentQuery';
import Pagination from '../components/Common/Pagination';

export default function InvestmentPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [params, setParams] = useState({
    order: 'sim_invest',
    sort: 'desc'
  });

  const { data, isLoading, isError } = useGetInvestmentList({
    currentPage,
    pageSize,
    order: params.order,
    sort: params.sort
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error..</div>;

  const list = data.list;
  const totalPages = Math.ceil(data.totalCount / pageSize);

  // 정렬 처리 함수
  const handleSortChange = (order, sort) => {
    setParams((prevParams) => ({
      ...prevParams,
      order,
      sort
    }));
  };

  return (
    <div>
      <InvestmentHeader setSortOrder={handleSortChange} />
      <InvestmentList list={list} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
