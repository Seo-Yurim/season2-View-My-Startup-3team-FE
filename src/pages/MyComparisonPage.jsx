import styles from "../styles/MyComparisonPage.module.css";
import { useEffect, useState } from "react";
import {
  useCancelCompreStartups,
  useCancelMyStartup,
  useGetSelectedStartups,
} from "../api/queries/selectionQuery";
import Button from "../components/Common/Button/Button";
import Loading from "../components/Common/Loading/Loading";
import Warn from "../components/Common/Warning/Warn";
import CreateInvestModal from "../components/Modal/CreateInvestModal/CreateInvestModal";
import RankResult from "../components/Selection/RankResult";
import CompareResult from "../components/Selection/CompareResult";
import MySelection from "../components/Selection/MySelection";
import CompareSelection from "../components/Selection/CompareSelection";
import { Helmet } from "react-helmet-async";

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

  // 내 기업 모두 취소
  const canceltMyStartup = useCancelMyStartup();
  const handleCancelMyStartup = () => {
    canceltMyStartup.mutate({ id: selectedStartup.id, sessionId });
  };

  // 비교 기업 모두 취소
  const cancelCompareStartup = useCancelCompreStartups();
  const handleCancelCompareStartup = () => {
    let compareSelectedIds = compareStartups.map((startup) => startup.id);
    cancelCompareStartup.mutate({ ids: compareSelectedIds, sessionId });
  };

  // 전체 취소
  const handleReset = () => {
    handleCancelMyStartup();
    handleCancelCompareStartup();
    setIsComparisonDone(false);
  };

  // 비교 결과 보여주기
  const handleShowResult = () => {
    setIsComparisonDone(true);
  };

  return (
    <>
      <Helmet>
        <title>나의 기업 비교 - View My Startup</title>
        <meta
          name="description"
          content="나의 기업과 다른 기업을 비교해보세요!"
        />
        <meta property="og:title" content="나의 기업 비교" />
        <meta
          property="og:description"
          content="나의 기업과 다른 기업을 비교해보세요!"
        />
        <meta
          property="og:url"
          content="http://view-my-startup-s3-fe.s3-website.ap-northeast-2.amazonaws.com/my-comparison"
        />
      </Helmet>

      <main className={styles.wrap}>
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
              onReset={handleReset}
              isComparisonDone={isComparisonDone}
              setIsComparisonDone={setIsComparisonDone}
            />
            {!isComparisonDone &&
              (selectedStartup || compareStartups.length > 0) && (
                <CompareSelection
                  sessionId={sessionId}
                  selectedStartup={selectedStartup}
                  compareSelectedStartups={compareStartups}
                  setCompareStartups={setCompareStartups}
                />
              )}

            {!isComparisonDone && (
              <Button
                width="20rem"
                label="기업 비교하기"
                onClick={handleShowResult}
                isDisabled={
                  selectedStartup && compareStartups.length ? false : true
                }
              />
            )}

            {isComparisonDone && (
              <div className={styles.result}>
                <CompareResult
                  sessionId={sessionId}
                  startupId={selectedStartup.id}
                />
                <RankResult startupId={selectedStartup.id} />
                <Button
                  label="나의 기업에 투자하기"
                  width="20rem"
                  onClick={() => setIsInvestModal(true)}
                />
              </div>
            )}

            {isInvestModal && (
              <CreateInvestModal
                onClose={() => setIsInvestModal(false)}
                startup={selectedStartup}
              />
            )}
          </>
        )}
      </main>
    </>
  );
}
