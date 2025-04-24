import styles from "./CompareSelectionModal.module.css";
import ic_X from "../../assets/ic_x.svg";
import ic_check from "../../assets/ic_check.svg";
import { useState, useEffect } from "react";
import Pagination from "../Common/Pagination/Pagination";
import { useGetStartupList } from "../../api/queries/comparisonQuery";
import SearchInput from "../Common/Search/SearchInput";
import Loading from "../Common/Loading/Loading";
import Warn from "../Common/Warning/Warn";
import ModalContainer from "../Modal/ModalContainer/ModalContainer";
import StartupTitle from "../Common/StartupTitle/StartupTitle";

export default function CompareSelectionModal({
  onClose,
  onSelectStartup,
  selectedStartups,
  existingSelectedStartups,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const [selectCompareStartups, setSelectComparedStartups] =
    useState(selectedStartups);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setSelectComparedStartups(selectedStartups);
  }, [selectedStartups]);

  const { data, isLoading, isError } = useGetStartupList({
    page: currentPage,
    search,
  });

  const startups = data?.list;
  const totalCount = data?.totalCount;
  const totalPages = data?.totalPages;

  // 선택 해제
  const handleDeselectCompareStartups = (startup) => {
    // 선택된 스타트업을 해제
    const newSelected = selectCompareStartups.filter(
      (s) => s.id !== startup.id
    );
    setSelectComparedStartups(newSelected);
    onSelectStartup(newSelected);
    setErrorMessage("");
  };

  // 선택하기
  const handleSelectCompareStartups = (startup) => {
    if (selectedStartups.some((selected) => selected.id === startup.id)) {
      return; // 선택된 스타트업은 무시
    }
    if (selectCompareStartups.includes(startup)) {
      // 이미 선택된 스타트업을 해제
      const newSelected = selectCompareStartups.filter((s) => s !== startup);
      setSelectComparedStartups(newSelected);
      onSelectStartup(newSelected);
      setErrorMessage("");
    } else {
      // 새 스타트업을 선택
      if (selectCompareStartups.length < 5) {
        const newSelected = [...selectCompareStartups, startup];
        setSelectComparedStartups(newSelected);
        onSelectStartup(newSelected);
      } else {
        setErrorMessage("*비교할 기업은 최대 5개까지 선택 가능합니다."); // 오류 메시지 설정
      }
    }
  };

  // 모달 외 영역 클릭 시 모달 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // 모달 안 기업 리스트
  const StartupList = ({
    title,
    startups,
    selectCompareStartups,
    handleSelectCompareStartups,
  }) => (
    <div>
      <h3 className={styles.title}>
        {title} ({totalCount})
      </h3>
      <ul className={styles.list}>
        {startups.map((startup) => (
          <li key={startup.id}>
            <StartupTitle item={startup} isCategory={true} />
            {existingSelectedStartups.some(
              (existing) => existing.id === startup.id
            ) && (
              <button
                type="button"
                className={styles.mySelectedBtn}
                onClick={() => handleSelectCompareStartups(startup)}
                disabled={true}
              >
                나의 기업
              </button>
            )}
            {!existingSelectedStartups.some(
              (existing) => existing.id === startup.id
            ) && (
              <button
                type="button"
                className={`${styles.selectionBtn} ${
                  selectCompareStartups.includes(startup) ||
                  selectedStartups.some(
                    (selected) => selected.id === startup.id
                  )
                    ? styles.completeBtn
                    : styles.selectionBtn
                }`}
                onClick={() => handleSelectCompareStartups(startup)}
                disabled={
                  selectCompareStartups.includes(startup) ||
                  selectedStartups.some(
                    (selected) => selected.id === startup.id
                  )
                }
              >
                {selectCompareStartups.includes(startup) ||
                selectedStartups.some(
                  (selected) => selected.id === startup.id
                ) ? (
                  <>
                    <img
                      src={ic_check}
                      alt="checkImg"
                      className={styles.checkIcon}
                    />
                    선택완료
                  </>
                ) : (
                  "선택하기"
                )}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <ModalContainer>
      {isLoading && <Loading />}
      {isError && (
        <Warn
          variant="error"
          title="오류발생"
          description={"데이터를 불러오는 중 오류가 발생했습니다."}
        />
      )}
      {!isLoading && !isError && (
        <div className={styles.form}>
          <div className={styles.header}>
            <h2>비교할 기업 선택하기</h2>
            <img src={ic_X} alt="ic_X" onClick={onClose} />
          </div>
          <SearchInput setSearchKeyword={(search) => setSearch(search)} />
          {selectCompareStartups.length > 0 && (
            <div className={styles.selectStartup}>
              <h3 className={styles.title}>
                선택한 기업 ({selectCompareStartups.length})
              </h3>
              <ul className={styles.list}>
                {selectCompareStartups.map((startup) => (
                  <li key={startup.id}>
                    <StartupTitle item={startup} isCategory={true} />
                    <button
                      type="button"
                      className={`${styles.selectionBtn} ${styles.canselBtn}`}
                      onClick={() => handleDeselectCompareStartups(startup)}
                    >
                      선택 해제
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <StartupList
            title="기업"
            startups={startups}
            selectCompareStartups={selectCompareStartups}
            handleSelectCompareStartups={handleSelectCompareStartups}
          />
          {errorMessage && <p className="form-error">{errorMessage}</p>}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </ModalContainer>
  );
}
