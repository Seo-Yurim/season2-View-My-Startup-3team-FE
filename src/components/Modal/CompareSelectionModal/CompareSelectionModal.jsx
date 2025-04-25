import styles from "./CompareSelectionModal.module.css";
import ic_X from "../../../assets/ic_x.svg";
import ic_check from "../../../assets/ic_check.svg";
import { useState } from "react";
import Pagination from "../../Common/Pagination/Pagination";
import { useGetStartupList } from "../../../api/queries/comparisonQuery";
import SearchInput from "../../Common/Search/SearchInput";
import Loading from "../../Common/Loading/Loading";
import Warn from "../../Common/Warning/Warn";
import ModalContainer from "../ModalContainer/ModalContainer";
import StartupTitle from "../../Common/StartupTitle/StartupTitle";
import Button from "../../Common/Button/Button";
import { useSelectCompareStartups } from "../../../api/queries/selectionQuery";

export default function CompareSelectionModal({
  sessionId,
  onClose,
  onCancel,
  selectedStartup,
  selectedStartups,
  setCompareStartups,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data, isLoading, isError } = useGetStartupList({
    page: currentPage,
    search,
  });

  const startups = data?.list;
  const totalCount = data?.totalCount;
  const totalPages = data?.totalPages;

  const selectCompareStartup = useSelectCompareStartups();
  const handleSelect = (startup) => {
    if (selectedStartups.length < 5) {
      if (selectedStartups.some((s) => s.id === startup.id)) return;

      setCompareStartups((prev) => [...prev, startup]);
      selectCompareStartup.mutate({ ids: [startup.id], sessionId });
      setErrorMessage("");
    } else {
      setErrorMessage("* 비교할 기업은 최대 5개까지 선택 가능합니다.");
    }
  };

  // 모달 외 영역 클릭 시 모달 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalContainer onClick={handleOverlayClick}>
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
          <div className={styles.title}>
            <h2>비교할 기업 선택하기</h2>
            <img src={ic_X} alt="ic_X" onClick={onClose} />
          </div>
          <SearchInput setSearchKeyword={(search) => setSearch(search)} />
        </div>

        {selectedStartups.length > 0 && (
          <div className={styles.startups}>
            <h3 className={styles[`sub-title`]}>
              선택한 기업 ({selectedStartups.length})
            </h3>
            <ul className={styles.list}>
              {selectedStartups.map((startup) => (
                <li key={startup.id}>
                  <StartupTitle item={startup} isCategory={true} />
                  <Button
                    label="선택 해제"
                    styleType="square"
                    width="11rem"
                    color="var(--secondary-gray-200)"
                    onClick={() => onCancel(startup)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {!isLoading && !isError && (
          <div className={styles.startups}>
            <h3 className={styles[`sub-title`]}>기업 ({totalCount})</h3>
            <ul className={styles.list}>
              {startups.map((startup) => (
                <li key={startup.id}>
                  <StartupTitle item={startup} isCategory={true} />
                  {selectedStartup.id === startup.id ? (
                    <Button
                      label="나의 기업"
                      styleType="square"
                      width="11rem"
                      color="var(--primary-blue)"
                      isDisabled={true}
                    />
                  ) : selectedStartups.some(
                      (selected) => selected.id === startup.id
                    ) ? (
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
                      onClick={() => handleSelect(startup)}
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
        <Button label="기업 선택 완료" width="20rem" onClick={onClose} />
      </div>
    </ModalContainer>
  );
}
