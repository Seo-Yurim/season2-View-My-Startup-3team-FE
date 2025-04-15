import { useState } from "react";
import { useGetInvestmentList } from "../api/queries/investmentQuery";
import Pagination from "../components/Common/Pagination/Pagination";
import Dropdown from "../components/Common/Dropdown/Dropdown";
import styles from "../styles/InvestmentPage.module.css";
import TableList from "../components/Common/TableList/TableList";
import noImageIcon from "../assets/no-image.png";
import { formatAmount } from "../utils/formatAmount";

const sortOptions = {
  "View My Startup 누적 투자 금액 높은 순": ["sim_invest", "desc"],
  "View My Startup 누적 투자 금액 낮은 순": ["sim_invest", "asc"],
  "실제 누적 투자 금액 높은 순": ["actual_invest", "desc"],
  "실제 누적 투자 금액 낮은 순": ["actual_invest", "asc"],
};

const tableHead = [
  {
    title: "순위",
    width: "6.8rem",
    render: (item) => item.rank,
  },
  {
    title: "기업 명",
    width: "21.3rem",
    render: (item) => (
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <img
          src={item.startup.image || noImageIcon}
          alt={item.startup.name}
          style={{
            width: "3.2rem",
            height: "3.2rem",
            borderRadius: "100%",
            backgroundColor: "white",
          }}
        />
        {item.startup.name}
      </div>
    ),
  },
  {
    title: "기업 소개",
    width: "30.4rem",
    render: (item) => item.startup.description,
  },
  {
    title: "카테고리",
    width: "15.4rem",
    render: (item) => item.startup.categoryName,
  },
  {
    title: "모의 누적 투자 금액",
    width: "23.1rem",
    render: (item) => formatAmount(item.startup.simInvest),
  },
  {
    title: "실제 누적 투자 금액",
    width: "23rem",
    render: (item) => formatAmount(item.startup.actualInvest),
  },
];

export default function InvestmentPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [params, setParams] = useState({
    order: "sim_invest",
    sort: "desc",
  });

  const { data, isLoading, isError } = useGetInvestmentList({
    currentPage,
    pageSize,
    order: params.order,
    sort: params.sort,
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
      sort,
    }));
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>투자 현황</h1>
        <Dropdown
          sortOptions={sortOptions}
          setSortOrder={handleSortChange}
          order={params.order}
          sort={params.sort}
        />
      </div>
      <TableList tableHead={tableHead} list={list} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
