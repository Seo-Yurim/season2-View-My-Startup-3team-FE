import {
  useGetRecentSelectionList,
  useGetStartupList,
} from "../../../api/queries/comparisonQuery";
import Loading from "../../Common/Loading/Loading";
import Pagination from "../../Common/Pagination/Pagination";
import SearchInput from "../../Common/Search/SearchInput";
import StartupTitle from "../../Common/StartupTitle/StartupTitle";
import Warn from "../../Common/Warning/Warn";
import ModalContainer from "../ModalContainer/ModalContainer";
import styles from "./SelectStartupModal.module.css";
import ic_X from "../../../assets/ic_x.svg";
import ic_check from "../../../assets/ic_check.svg";
import noImageIcon from "../../../assets/no-image.png";
import { useEffect, useState } from "react";

export default function SelectStartupModal({
  title,
  onClose,
  isMyStartup,
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

  const {
    data: recentStartupList,
    isLoading: recentLoading,
    isError: recentError,
  } = useGetRecentSelectionList();

  const { data, isLoading, isError } = useGetStartupList({
    page: currentPage,
    search,
  });

  if (recentLoading) return <Loading />;
  if (recentError)
    return (
      <Warn
        variant="error"
        title="오류발생"
        description={"데이터를 불러오는 중 오류가 발생했습니다."}
      />
    );

  const recentStartups = recentStartupList?.list;
  console.log(recentStartups);

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

  const handleSelect = (startup) => {
    onSelectStartup(startup);
    onClose();
  };

  // 모달 외 영역 클릭 시 모달 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h2>{title}</h2>
          <img src={ic_X} alt="ic_X" onClick={onClose} />
        </div>
        <SearchInput setSearchKeyword={(search) => setSearch(search)} />

        {/* 비교할 기업 선택 시 표시되는 리스트 */}
        {!isMyStartup && selectCompareStartups.length > 0 && (
          <div className={styles.startups}>
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

        {isMyStartup && !search && (
          <div>
            <h3 className={styles.title}>
              최근 선택된 기업 ({recentStartups?.length && startups?.length})
            </h3>
            <ul>
              {recentStartups.slice(0, 5).map((startup) => (
                <li key={startup.id} className={styles.list}>
                  <div className={styles.listStartup}>
                    <img
                      src={startup.startup.image || noImageIcon}
                      alt={`${startup.name} 로고`}
                      style={{
                        width: "3.2rem",
                        height: "3.2rem",
                        marginRight: "0.8rem",
                        verticalAlign: "middle",
                        borderRadius: "50%",
                        backgroundColor: "white",
                        objectFit: "cover",
                      }}
                    />
                    <span className={styles.name}>{startup.startup.name}</span>
                    <span className={styles.category}>
                      {startup.startup.category.category}
                    </span>
                  </div>
                  {!existingSelectedStartups.some(
                    (existing) => existing.id === startup.startup.id
                  ) && (
                    <button
                      type="button"
                      className={styles.selectionBtn}
                      onClick={() => handleSelect(startup.startup)}
                    >
                      선택하기
                    </button>
                  )}
                  {existingSelectedStartups.some(
                    (existing) => existing.id === startup.startup.id
                  ) && (
                    <button
                      type="button"
                      className={styles.compareSelectedBtn}
                      onClick={() => handleSelect(startup.startup)}
                      disabled={true}
                    >
                      비교 기업
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {!isLoading && !isError && (
          <div className={styles.startups}>
            <h3 className={styles.title}>기업 ({totalCount})</h3>
            <ul className={styles.list}>
              {startups.map((startup) => (
                <li key={startup.id}>
                  <StartupTitle item={startup} isCategory={true} />
                  {/* 나의 기업으로 선택한 기업일 때 */}
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

                  {/* 나의 기업으로 선택하지 않은 그 외 기업들 */}
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
                      {/* 비교할 기업으로 선택한 기업 */}
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
        )}

        {errorMessage && <p className="form-error">{errorMessage}</p>}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </ModalContainer>
  );
}
