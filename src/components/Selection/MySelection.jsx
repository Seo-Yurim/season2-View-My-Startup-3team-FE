import styles from "./MySelection.module.css";
import btn_plus from "../../assets/btn_plus.svg";
import MySelectionModal from "./MySelectionModal";
import CompareSelectionModal from "./CompareSelectionModal";
import { useState, useEffect, useCallback } from "react";
import ic_minus from "../../assets/ic_minus.svg";
import ic_restart from "../../assets/ic_restart.svg";
import useFetchMySelection from "../../hooks/useFetchMySelection";
import useFetchCompare from "../../hooks/useFetchCompare";
import noImageIcon from "../../assets/no-image.png";
import useFetchCancelMySelection from "../../hooks/useFetchCancelMySelection";
import useFetchCancelCompare from "../../hooks/useFetchCancelCompare";
import CreateInvestModal from "../Modal/CreateInvestModal/CreateInvestModal";
import useFetchRank from "../../hooks/useFetchRanck";
import CompareResult from "./CompareResult";
import RankResult from "./\bRankResult";
import Button from "../Common/Button/Button";

export default function MySelection() {
  const [isModal, setIsModal] = useState(false);
  const [isComparedModal, setIsComparedModal] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState([]);
  const [compareSelectedStartups, setCompareSelectedStartups] = useState([]);
  const { fetchMySelection } = useFetchMySelection();
  const { fetchComparison } = useFetchCompare();
  const [isComparisonDone, setIsComparisonDone] = useState(false);
  const { fetchCancelMySelection } = useFetchCancelMySelection();
  const { fetchCancelComparison } = useFetchCancelCompare();
  const [isInvestModal, setIsInvestModal] = useState(false);

  let sessionId = sessionStorage.getItem("sessionId");
  const API_HOST = "http://3.39.23.207:3000";

  const fetchExistingSelections = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_HOST}/api/selections?sessionId=${sessionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("선택 정보를 불러오는 데 실패했습니다.");
      }

      const data = await response.json();
      setSelectedStartup(data.selectedStartups || []);
      setCompareSelectedStartups(data.comparisonStartups || []);
    } catch (error) {
      console.error("기존 선택 정보를 불러오는 중 오류 발생:", error);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchExistingSelections();
  }, [fetchExistingSelections]);

  const handleSelectStartup = (startup) => {
    if (!selectedStartup.some((s) => s.id === startup.id)) {
      setSelectedStartup((prev) => [...prev, startup]);
    }
  };

  const handleRemoveStartup = (id) => {
    setSelectedStartup((prev) => prev.filter((startup) => startup.id !== id));
  };

  const handleCompareRemoveStartups = (id) => {
    setCompareSelectedStartups((prev) =>
      prev.filter((startup) => startup.id !== id)
    );
  };

  const handleResetAll = () => {
    setSelectedStartup([]);
    setCompareSelectedStartups([]);
    setIsComparisonDone(false);
  };

  const handleCompareButtonClick = async () => {
    const promise = selectedStartup.map((startup) => {
      return fetchMySelection(startup.id);
    });
    await Promise.all(promise);

    const ids = compareSelectedStartups.map((startup) => startup.id);
    await fetchComparison(ids);
    setIsComparisonDone(true);
  };

  const handleCloseCompare = () => {
    setIsComparisonDone(false);
  };

  const handleCancelButtonClick = async () => {
    const promise = selectedStartup.map((startup) => {
      return fetchCancelMySelection(startup.id);
    });
    await Promise.all(promise);
    const ids = compareSelectedStartups.map((startup) => startup.id);
    await fetchCancelComparison(ids);
  };

  const handleCancelCompare = async () => {
    const ids = compareSelectedStartups.map((startup) => startup.id);
    await fetchCancelComparison(ids);
  };

  const handleCancelMy = async () => {
    const promise = selectedStartup.map((startup) => {
      return fetchCancelMySelection(startup.id);
    });
    await Promise.all(promise);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 743);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 743);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.myNav}>
        {!isComparisonDone && (
          <div className={styles.headerBox}>
            {isMobile ? (
              <h2 className={styles.headerTxt}>
                나의 기업을 <br /> 선택해주세요!
              </h2>
            ) : (
              <h2 className={styles.headerTxt}>나의 기업을 선택해주세요!</h2>
            )}

            {compareSelectedStartups.length > 0 && (
              <button
                className={styles.resetBtn}
                onClick={() => {
                  handleResetAll();
                  handleCancelButtonClick();
                }}
              >
                <img
                  src={ic_restart}
                  alt="loadingLogo"
                  className={styles.loadingLogo}
                />
                전체 초기화
              </button>
            )}
          </div>
        )}
        {isComparisonDone && (
          <div className={styles.doneCompareBox}>
            <h2 className={styles.doneCompareTxt}>내가 선택한 기업</h2>
            <button
              className={styles.beforeBtn}
              onClick={() => {
                handleCloseCompare();
                handleCancelButtonClick();
              }}
            >
              다른 기업 비교하기
            </button>
          </div>
        )}
      </div>
      <div
        className={styles.borderBox}
        style={{ border: selectedStartup.length > 0 ? "none" : "" }}
      >
        <div className={styles.innerBox}>
          {selectedStartup.map((startup) => (
            <div key={startup.id} className={styles.selectedStartup}>
              {!isComparisonDone && (
                <button
                  className={styles.removeBtn}
                  onClick={() => {
                    handleRemoveStartup(startup.id);
                    handleCancelMy();
                  }}
                >
                  선택 취소
                </button>
              )}
              <img
                src={startup.image || noImageIcon}
                alt="startupImg"
                className={styles.startupImg}
                style={{
                  verticalAlign: "middle",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  objectFit: "cover",
                }}
              />
              <span className={styles.startupName}>{startup.name}</span>
              <span className={styles.startupCategory}>
                {startup.category.category}
              </span>
            </div>
          ))}
          {selectedStartup.length === 0 && (
            <div>
              <img
                className={styles.plusBtnImg}
                src={btn_plus}
                alt="Add startup"
                onClick={() => setIsModal(true)}
              />
              <h3>기업 추가</h3>
            </div>
          )}
        </div>
      </div>
      {!isComparisonDone && selectedStartup.length > 0 && (
        <>
          <div className={styles.selectedNav}>
            <div className={styles.selectedHeader}>
              {isMobile ? (
                <span>
                  어떤 기업이 궁금하세요? <br /> (최대 5개)
                </span>
              ) : (
                <span>어떤 기업이 궁금하세요? (최대 5개)</span>
              )}

              <button
                onClick={() => setIsComparedModal(true)}
                className={`${styles.addBtn} ${
                  compareSelectedStartups.length >= 5
                    ? styles.disabledBtn
                    : styles.addBtn
                }`}
                disabled={compareSelectedStartups.length >= 5}
              >
                기업 추가하기
              </button>
            </div>
          </div>
          <div
            className={styles.borderBox}
            style={{ border: selectedStartup.length > 0 ? "none" : "" }}
          >
            <div
              style={{ border: selectedStartup.length > 0 ? "none" : "" }}
              className={
                compareSelectedStartups.length > 0
                  ? styles.innerBoxMobile
                  : styles.innerBox
              }
            >
              {compareSelectedStartups.length === 0 ? (
                <h2>
                  아직 추가된 기업이 없어요. <br /> 버튼을 눌러 기업을
                  추가해보세요!
                </h2>
              ) : (
                compareSelectedStartups.map((startup) => (
                  <div
                    key={startup.id}
                    className={styles.compareSelectedStartup}
                  >
                    <img
                      src={ic_minus}
                      alt="minus"
                      className={styles.minusIcon}
                      onClick={() => {
                        handleCompareRemoveStartups(startup.id);
                        handleCancelCompare();
                      }}
                    />
                    <img
                      src={startup.image || noImageIcon}
                      alt="startupImg"
                      className={styles.startupImg}
                      style={{
                        verticalAlign: "middle",
                        borderRadius: "50%",
                        backgroundColor: "white",
                        objectFit: "cover",
                      }}
                    />
                    <span className={styles.startupName}>{startup.name}</span>
                    <span className={styles.startupCategory}>
                      {startup.category.category}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
      {!isComparisonDone && (
        <button
          className={`${styles.compareBtn} ${
            selectedStartup.length > 0 && compareSelectedStartups.length > 0
              ? styles.compareActiveBtn
              : styles.compareBtn
          }`}
          disabled={
            selectedStartup.length > 0 && compareSelectedStartups.length > 0
              ? false
              : true
          }
          onClick={() => {
            handleCompareButtonClick();
          }}
        >
          기업 비교하기
        </button>
      )}

      {isModal && (
        <MySelectionModal
          onClose={() => setIsModal(false)}
          onSelectStartup={handleSelectStartup}
          existingSelectedStartups={compareSelectedStartups}
        />
      )}
      {isComparedModal && (
        <CompareSelectionModal
          selectedStartups={compareSelectedStartups}
          onSelectStartup={(startups) => setCompareSelectedStartups(startups)}
          onClose={() => setIsComparedModal(false)}
          existingSelectedStartups={selectedStartup}
        />
      )}

      {isComparisonDone && (
        <CompareResult
          sessionId={sessionId}
          startupId={selectedStartup[0]?.id}
        />
      )}
      {isComparisonDone && <RankResult startupId={selectedStartup[0]?.id} />}
      {isComparisonDone && (
        <Button
          label="나의 기업에 투자하기"
          width="20rem"
          onClick={() => setIsInvestModal(true)}
        />
      )}
      {isInvestModal && (
        <CreateInvestModal
          onClose={() => setIsInvestModal(false)}
          startup={selectedStartup[0]}
        />
      )}
    </div>
  );
}
