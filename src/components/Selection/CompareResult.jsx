import styles from "./CompareResult.module.css";
import { useGetCompareResult } from "../../api/queries/comparisonQuery";
import TableList from "../Common/TableList/TableList";
import Dropdown from "../Common/Dropdown/Dropdown";
import {
  COMPARE_RESULT_SORT_OPTIONS,
  COMPARE_RESULT_TABLE_DATA,
} from "../../constant";
import { useState } from "react";

export default function CompareResult({ sessionId }) {
  const [params, setParams] = useState({
    order: "simInvest",
    sort: "desc",
  });
  const { data, isLoading, isError } = useGetCompareResult({
    sessionId,
    orderBy: params.sort,
    sortBy: params.order,
  });

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;

  // 정렬 처리 함수
  const handleSortChange = (order, sort) => {
    setParams((prevParams) => ({
      ...prevParams,
      order,
      sort,
    }));
  };

  return (
    <div className={styles.wrap}>
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
        tableData={COMPARE_RESULT_TABLE_DATA}
        list={data}
        pageSize={5}
      />
    </div>
  );
}
