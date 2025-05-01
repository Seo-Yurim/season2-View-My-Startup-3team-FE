import styles from "../styles/ComparisonPage.module.css";
import { useState } from "react";
import { useGetStartupList } from "../api/queries/startupQuery";
import {
  COMPARISON_SORT_OPTIONS,
  COMPARISON_TABLE_DATA,
  PAGE_SIZE,
} from "../constant";
import Warn from "../components/Common/Warning/Warn";
import Loading from "../components/Common/Loading/Loading";
import Dropdown from "../components/Common/Dropdown/Dropdown";
import TableList from "../components/Common/TableList/TableList";
import Pagination from "../components/Common/Pagination/Pagination";
import { Helmet } from "react-helmet-async";

export default function ComparisonPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState({
    order: "selected_count",
    sort: "desc",
  });

  const { data, isLoading, isError } = useGetStartupList({
    page: currentPage,
    limit: PAGE_SIZE,
    order: params.order,
    sort: params.sort,
  });

  const startups = data?.list;
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
        <title>비교 현황 - View My Startup</title>
        <meta
          name="description"
          content="스타트업들의 비교 현황을 확인해보세요!"
        />
        <meta property="og:title" content="비교 현황" />
        <meta
          property="og:description"
          content="스타트업들의 비교 현황을 확인해보세요!"
        />
        <meta
          property="og:url"
          content="http://view-my-startup-s3-fe.s3-website.ap-northeast-2.amazonaws.com/comparison"
        />
      </Helmet>

      {isLoading && <Loading />}
      {isError && (
        <Warn
          title="오류발생"
          description={"비교 현황 목록을 불러오는 중 오류가 발생했어요 😥"}
        />
      )}
      {!isLoading && !isError && (
        <main className={styles.wrap}>
          <div className={styles.header}>
            <h1>비교 현황</h1>
            <Dropdown
              sortOptions={COMPARISON_SORT_OPTIONS}
              setSortOrder={handleSortChange}
              order={params.order}
              sort={params.sort}
            />
          </div>
          <TableList tableData={COMPARISON_TABLE_DATA} list={startups} />
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
