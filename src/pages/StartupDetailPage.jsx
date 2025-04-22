import { useParams } from "react-router-dom";
import { useGetStartupDetail } from "../api/queries/startupQuery";
import Loading from "../components/Common/Loading/Loading";
import Warn from "../components/Common/Warning/Warn";
import StartupInfo from "../components/StartupDetail/StartupInfo";
import InvestorList from "../components/StartupDetail/InvestorList";
import { useState } from "react";
import Pagination from "../components/Common/Pagination/Pagination";
import { Helmet } from "react-helmet-async";

const MAX_ITEMS = 5;

export default function StartupDetailPage() {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetStartupDetail(id, {
    page: currentPage,
    limit: MAX_ITEMS,
  });

  if (isError) {
    return (
      <Warn
        variant="error"
        title="오류발생"
        description={"기업 상세 정보를 불러오는 데 실패했습니다."}
      />
    );
  }

  if (isLoading && !data) {
    return <Loading />;
  }

  const investors = data?.mockInvestors;
  const startup = data?.startup;
  const totalCount = investors?.totalCount;
  const totalPages = Math.ceil(totalCount / MAX_ITEMS);

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
          content="http://view-my-startup-s3-fe.s3-website.ap-northeast-2.amazonaws.com/"
        />
      </Helmet>

      <main style={{ display: "flex", flexDirection: "column", gap: "3.2rem" }}>
        <StartupInfo startup={startup} />
        <InvestorList startup={startup} investors={investors.list} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </>
  );
}
