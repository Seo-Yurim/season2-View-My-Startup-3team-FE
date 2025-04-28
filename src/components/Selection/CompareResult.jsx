import styles from "./CompareResult.module.css";
import { useGetCompareResult } from "../../api/queries/comparisonQuery";
import TableList from "../Common/TableList/TableList";
import Dropdown from "../Common/Dropdown/Dropdown";
import {
  COMPARE_RESULT_SORT_OPTIONS,
  COMPARE_RESULT_TABLE_DATA,
} from "../../constant";
import { useState } from "react";
import Loading from "../Common/Loading/Loading";
import Warn from "../Common/Warning/Warn";

export default function CompareResult({ sessionId, startupId }) {
  const [params, setParams] = useState({
    order: "simInvest",
    sort: "desc",
  });
  const { data, isLoading, isError } = useGetCompareResult({
    sessionId,
    orderBy: params.sort,
    sortBy: params.order,
  });

  // 정렬 처리 함수
  const handleSortChange = (order, sort) => {
    setParams((prevParams) => ({
      ...prevParams,
      order,
      sort,
    }));
  };

  return (
    <section className={styles.wrap}>
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
            <h2 className={styles.title}>비교 결과 확인하기</h2>
            <Dropdown
              sortOptions={COMPARE_RESULT_SORT_OPTIONS}
              setSortOrder={handleSortChange}
              order={params.order}
              sort={params.sort}
            />
          </div>
          <TableList
            isEmpty={false}
            startupId={startupId}
            tableData={COMPARE_RESULT_TABLE_DATA}
            list={data}
          />
        </>
      )}
    </section>
  );
}
