import InvestmentList from '../components/Investment/InvestmentList';
import { useState } from 'react';
import { useGetInvestmentList } from '../api/queries/investmentQuery';
import Pagination from '../components/Common/Pagination';
import Dropdown from '../components/Common/Dropdown/Dropdown';
import styles from '../styles/InvestmentPage.module.css';

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
      <div className={styles.header}>
        <h1>투자 현황</h1>
        <Dropdown setSortOrder={handleSortChange} />
      </div>
      <InvestmentList list={list} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
