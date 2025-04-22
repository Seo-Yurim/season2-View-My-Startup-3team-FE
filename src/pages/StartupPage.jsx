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
    setParams({ keyword });
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
      {isLoading && <Loading />}
      {isError && (
        <Warn
          variant="error"
          title="오류발생"
          description={"데이터를 불러오는 중 오류가 발생했습니다."}
        />
      )}
      {!isLoading && !isError && (
        <>
          <div className={styles.header}>
            <h1>전체 스타트업 목록</h1>
            <div className={styles.searchDropdownContainer}>
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
        </>
      )}
    </>
  );
}
