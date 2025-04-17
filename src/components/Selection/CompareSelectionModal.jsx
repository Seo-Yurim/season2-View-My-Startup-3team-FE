import styles from "./CompareSelectionModal.module.css";
import ic_X from "../../assets/ic_x.svg";
import ic_search from "../../assets/ic_search.svg";
import ic_x_circle_small from "../../assets/ic_x_circle_small.svg";
import ic_check from "../../assets/ic_check.svg";
import useFetchMyStartup from "../../hooks/useFetchMyStartup";
import SelectionPagination from "./SelectionPagination";
import { useState, useEffect } from "react";
import noImageIcon from "../../assets/no-image.png";

export default function CompareSelectionModal({
  onClose,
  onSelectStartup,
  selectedStartups,
  existingSelectedStartups,
}) {
  const {
    startups,
    currentPage,
    totalPages,
    searchStartups,
    goToPage,
    totalCount,
  } = useFetchMyStartup();
  const [searchText, setSearchText] = useState("");
  const [selectCompareStartups, setSelectComparedStartups] =
    useState(selectedStartups);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setSelectComparedStartups(selectedStartups);
  }, [selectedStartups]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchText(newValue);

    if (newValue) {
      searchStartups(newValue);
    } else {
      searchStartups([]);
    }
  };

  const handleSearch = () => {
    if (!searchText) return;
    const results = startups.filter((startup) =>
      startup.name.toLowerCase().includes(searchText.toLowerCase())
    );
    searchStartups(results);
  };

  const handleClear = () => {
    setSearchText("");
    searchStartups([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleDeselectCompareStartups = (startup) => {
    // 선택된 스타트업을 해제
    const newSelected = selectCompareStartups.filter(
      (s) => s.id !== startup.id
    );
    setSelectComparedStartups(newSelected);
    onSelectStartup(newSelected);
    setErrorMessage("");
  };

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

  const inputPadding = searchText ? "1.2rem" : "1.2rem 1.2rem 1.2rem 3.7rem";

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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
      <ul>
        {startups.map((startup) => (
          <li className={styles.list} key={startup.id}>
            <div className={styles.listStartup}>
              <img
                src={startup.image || noImageIcon}
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
              <span className={styles.name}>{startup.name}</span>
              <span className={styles.category}>
                {startup.category.category}
              </span>
            </div>
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
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <form className={styles.form}>
        <div className={styles.header}>
          <h2>비교할 기업 선택하기</h2>
          <img src={ic_X} alt="ic_X" onClick={onClose} />
        </div>
        <label className={styles.search}>
          {!searchText && (
            <img className={styles.searchImg} src={ic_search} alt="ic_search" />
          )}
          <input
            type="text"
            value={searchText}
            onChange={handleChange}
            placeholder="검색어를 입력해주세요"
            onKeyDown={handleKeyDown}
            style={{ padding: inputPadding }}
          />
          <div className={styles.searchImgBlock}>
            {searchText && (
              <>
                <img
                  src={ic_x_circle_small}
                  alt="ic_x_circle_small"
                  onClick={handleClear}
                />
                <img src={ic_search} alt="ic_search" onClick={handleSearch} />
              </>
            )}
          </div>
        </label>
        {selectCompareStartups.length > 0 && (
          <div className={styles.selectStartup}>
            <h3 className={styles.title}>
              선택한 기업 ({selectCompareStartups.length})
            </h3>
            <ul>
              {selectCompareStartups.map((startup) => (
                <li key={startup.id} className={styles.list}>
                  <div className={styles.listStartup}>
                    <img
                      src={startup.image || noImageIcon}
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
                    <span className={styles.name}>{startup.name}</span>
                    <span className={styles.category}>
                      {startup.category.category}
                    </span>
                  </div>
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
        {!searchText && (
          <StartupList
            title="기업"
            startups={startups}
            selectCompareStartups={selectCompareStartups}
            handleSelectCompareStartups={handleSelectCompareStartups}
          />
        )}
        {searchText && (
          <StartupList
            title="검색 결과"
            startups={startups}
            selectCompareStartups={selectCompareStartups}
            handleSelectCompareStartups={handleSelectCompareStartups}
          />
        )}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <SelectionPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </form>
    </div>
  );
}
