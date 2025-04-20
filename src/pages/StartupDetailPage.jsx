import { useParams } from "react-router-dom";
import { useGetStartupDetail } from "../api/queries/startupQuery";
import Loading from "../components/Common/Loading/Loading";
import Warn from "../components/Common/Warning/Warn";
import StartupDetailHeader from "../components/StartupDetail/StartupDetailHeader";
import StartupDetailInfo from "../components/StartupDetail/StartupDetailInfo";
import StartupDetailInvest from "../components/StartupDetail/StartupDetailInvest";
import { useState } from "react";
import Pagination from "../components/Common/Pagination/Pagination";

const MAX_ITEMS = 5;

export default function StartupDetailPage() {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetStartupDetail(
    id,
    currentPage,
    MAX_ITEMS
  );

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
    <div>
      <StartupDetailHeader startup={startup} />
      <StartupDetailInfo startup={startup} />
      <StartupDetailInvest startup={startup} investors={investors} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
