import { useEffect, useState } from "react";
import { useGetSelectedStartups } from "../api/queries/selectionQuery";
import Button from "../components/Common/Button/Button";
import Loading from "../components/Common/Loading/Loading";
import Warn from "../components/Common/Warning/Warn";
import CreateInvestModal from "../components/Modal/CreateInvestModal/CreateInvestModal";
import RankResult from "../components/Selection/RankResult";
import CompareResult from "../components/Selection/CompareResult";
import MySelection from "../components/Selection/MySelection";
import CompareSelection from "../components/Selection/CompareSelection";

export default function MyComparisonPage() {
  let sessionId = sessionStorage.getItem("sessionId");
  const { data, isLoading, isError } = useGetSelectedStartups({ sessionId });

  const [selectedStartup, setSelectedStartup] = useState(
    data?.selectedStartups[0] || {}
  );
  const [compareStartups, setCompareStartups] = useState(
    data?.comparisonStartups || []
  );

  const [isComparisonDone, setIsComparisonDone] = useState(false);
  const [isInvestModal, setIsInvestModal] = useState(false);

  useEffect(() => {
    if (data) {
      setSelectedStartup(data?.selectedStartups?.[0] || null);
      setCompareStartups(data?.comparisonStartups || []);
    }
  }, [data]);

  console.log(compareStartups);

  return (
    <main>
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
          <MySelection
            sessionId={sessionId}
            selectedStartup={selectedStartup}
            compareStartups={compareStartups}
          />
          {!isComparisonDone && selectedStartup && (
            <CompareSelection
              sessionId={sessionId}
              compareSelectedStartups={compareStartups}
              setCompareSelectedStartups={setCompareStartups}
            />
          )}
        </>
      )}

      {!isComparisonDone && (
        <Button
          width="20rem"
          label="기업 비교하기"
          isDisabled={selectedStartup && compareStartups.length ? false : true}
        />
      )}

      {isComparisonDone && (
        <>
          <CompareResult
            sessionId={sessionId}
            startupId={selectedStartup[0]?.id}
          />
          <RankResult startupId={selectedStartup[0]?.id} />
          <Button
            label="나의 기업에 투자하기"
            width="20rem"
            onClick={() => setIsInvestModal(true)}
          />
        </>
      )}

      {isInvestModal && (
        <CreateInvestModal
          onClose={() => setIsInvestModal(false)}
          startup={selectedStartup[0]}
        />
      )}
    </main>
  );
}
