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
import Button from "../Common/Button/Button";

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

  console.log(selectCompareStartups);

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
          <h2>비교할 기업 선택하기</h2>
          <img src={ic_X} alt="ic_X" onClick={onClose} />
        </div>
        <SearchInput setSearchKeyword={(search) => setSearch(search)} />

        {selectCompareStartups.length > 0 && (
          <div className={styles.startups}>
            <h3 className={styles.title}>
              선택한 기업 ({selectCompareStartups.length})
            </h3>
            <ul className={styles.list}>
              {selectCompareStartups.map((startup) => (
                <li key={startup.id}>
                  <StartupTitle item={startup} isCategory={true} />
                  <Button
                    label="선택 해제"
                    styleType="square"
                    width="11rem"
                    color="var(--secondary-gray-200)"
                    onClick={() => handleDeselectCompareStartups(startup)}
                  />
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
                  {existingSelectedStartups[0].id === startup.id ? (
                    <Button
                      label="나의 기업"
                      styleType="square"
                      width="11rem"
                      color="var(--primary-blue)"
                      onClick={() => handleSelectCompareStartups(startup)}
                      isDisabled={true}
                    />
                  ) : selectCompareStartups.some((s) => s.id === startup.id) ||
                    selectedStartups.some((s) => s.id === startup.id) ? (
                    <Button
                      label="선택완료"
                      styleType="square"
                      img={ic_check}
                      width="11rem"
                      color="var(--secondary-gray-100)"
                      isDisabled={true}
                    />
                  ) : (
                    <Button
                      label="선택하기"
                      styleType="square"
                      width="11rem"
                      color="var(--primary-orange)"
                      onClick={() => handleSelectCompareStartups(startup)}
                    />
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
