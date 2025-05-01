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
import Warn from "../components/Common/Warning/Warn";
import { Helmet } from "react-helmet-async";

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

  const list = data?.list;
  const totalPages = Math.ceil(data?.totalCount / PAGE_SIZE);

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
      <Helmet>
        <title>투자 현황 - View My Startup</title>
        <meta name="description" content="기업들의 투자 현황을 확인보세요!" />
        <meta property="og:title" content="투자 현황" />
        <meta
          property="og:description"
          content="기업들의 투자 현황을 확인보세요!"
        />
        <meta
          property="og:url"
          content="http://view-my-startup-s3-fe.s3-website.ap-northeast-2.amazonaws.com/investment"
        />
      </Helmet>

      {isLoading && <Loading />}
      {isError && (
        <Warn
          title="오류 발생"
          description="투자 현황 목록을 불러오는 중 오류가 발생했어요 😥"
        />
      )}
      {!isLoading && !isError && (
        <main className={styles.wrap}>
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
        </main>
      )}
    </>
  );
}
