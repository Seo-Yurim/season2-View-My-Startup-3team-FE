import styles from "../styles/StartupPage.module.css";
import { useState } from "react";
import { useGetStartupList } from "../api/queries/startupQuery";
import Loading from "../components/Common/Loading/Loading";
import Pagination from "../components/Common/Pagination/Pagination";
import TableList from "../components/Common/TableList/TableList";
import Warn from "../components/Common/Warning/Warn";
import {
  PAGE_SIZE,
  STARTUP_SORT_OPTIONS,
  STARTUP_TABLE_DATA,
} from "../constant";
import SearchInput from "../components/Common/Search/SearchInput";
import Dropdown from "../components/Common/Dropdown/Dropdown";
import { Helmet } from "react-helmet-async";

export default function StartupPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState({
    order: "total_investment",
    sort: "desc",
    keyword: "",
  });

  const { data, isLoading, isError } = useGetStartupList({
    page: currentPage,
    limit: PAGE_SIZE,
    order: params.order,
    sort: params.sort,
    keyword: params.keyword,
  });

  const startups = data?.list;
  const totalPages = Math.ceil(data?.totalCount / PAGE_SIZE);

  // 검색 처리 함수
  const handleSearch = (keyword) => {
    setParams((prevParams) => ({
      ...prevParams,
      keyword,
    }));
  };

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
        <title>전체 스타트업 목록 - View My Startup</title>
        <meta
          name="description"
          content="모든 스타트업을 한눈에 보고 비교해보세요!"
        />
        <meta property="og:title" content="전체 스타트업 목록" />
        <meta
          property="og:description"
          content="모든 스타트업을 한눈에 보고 비교해보세요!"
        />
        <meta
          property="og:url"
          content="http://view-my-startup-s3-fe.s3-website.ap-northeast-2.amazonaws.com/startup"
        />
      </Helmet>

      {isLoading && <Loading />}
      {isError && (
        <Warn
          title="오류발생"
          description={"스타트업 목록을 불러오는 중 오류가 발생했어요 😥"}
        />
      )}
      {!isLoading && !isError && (
        <main className={styles.wrap}>
          <div className={styles.header}>
            <h1>전체 스타트업 목록</h1>
            <div className={styles[`search-dropdown`]}>
              <SearchInput setSearchKeyword={handleSearch} />
              <Dropdown
                sortOptions={STARTUP_SORT_OPTIONS}
                setSortOrder={handleSortChange}
                order={params.order}
                sort={params.sort}
              />
            </div>
          </div>
          <TableList tableData={STARTUP_TABLE_DATA} list={startups} />
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
