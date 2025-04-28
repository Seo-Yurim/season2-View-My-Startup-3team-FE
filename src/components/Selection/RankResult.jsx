import styles from "./RankResult.module.css";
import TableList from "../Common/TableList/TableList";
import Dropdown from "../Common/Dropdown/Dropdown";
import { COMPARE_RANK_TABLE_DATA, RANK_SORT_OPTIONS } from "../../constant";
import { useGetRankedStartupList } from "../../api/queries/startupQuery";
import { useState } from "react";
import Loading from "../Common/Loading/Loading";
import Warn from "../Common/Warning/Warn";

export default function RankResult({ startupId }) {
  const [params, setParams] = useState({
    order: "revenue",
    sort: "desc",
  });
  const { data, isLoading, isError } = useGetRankedStartupList(startupId, {
    order: params.order,
    sort: params.sort,
  });

  const rankedList = data?.list;

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
            <h2 className={styles.title}>기업 순위 확인하기</h2>
            <Dropdown
              sortOptions={RANK_SORT_OPTIONS}
              setSortOrder={handleSortChange}
              order={params.order}
              sort={params.sort}
            />
          </div>
          <TableList
            isEmpty={false}
            startupId={startupId}
            tableData={COMPARE_RANK_TABLE_DATA}
            list={rankedList}
          />
        </>
      )}
    </section>
  );
}
