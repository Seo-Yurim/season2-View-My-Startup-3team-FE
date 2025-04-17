import { useState } from "react";
import { useGetInvestmentList } from "../api/queries/investmentQuery";
import Pagination from "../components/Common/Pagination/Pagination";
import Dropdown from "../components/Common/Dropdown/Dropdown";
import styles from "../styles/InvestmentPage.module.css";
import TableList from "../components/Common/TableList/TableList";
import {
  PAGE_SIZE,
  INVESTMENT_SORT_OPTIONS,
  INVESTMENT_TABLE_DATA,
} from "../constant";
import Loading from "../components/Common/Loading/Loading";

export default function InvestmentPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState({
    order: "sim_invest",
    sort: "desc",
  });

  const { data, isLoading, isError } = useGetInvestmentList({
    currentPage,
    PAGE_SIZE,
    order: params.order,
    sort: params.sort,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error..</div>;

  const list = data.list;
  const totalPages = Math.ceil(data.totalCount / PAGE_SIZE);

  // 정렬 처리 함수
  const handleSortChange = (order, sort) => {
    setParams((prevParams) => ({
      ...prevParams,
      order,
      sort,
    }));
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>투자 현황</h1>
        <Dropdown
          sortOptions={INVESTMENT_SORT_OPTIONS}
          setSortOrder={handleSortChange}
          order={params.order}
          sort={params.sort}
        />
      </div>
      <TableList tableData={INVESTMENT_TABLE_DATA} list={list} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
