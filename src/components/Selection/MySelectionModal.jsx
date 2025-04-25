import styles from "./MySelectionModal.module.css";
import ic_X from "../../assets/ic_x.svg";
import { useState } from "react";
import { useGetRecentSelectionList } from "../../api/queries/comparisonQuery.js";
import { useGetStartupList } from "../../api/queries/comparisonQuery.js";
import SearchInput from "../Common/Search/SearchInput.jsx";
import Loading from "../Common/Loading/Loading.jsx";
import ModalContainer from "../Modal/ModalContainer/ModalContainer.jsx";
import StartupTitle from "../Common/StartupTitle/StartupTitle.jsx";
import Button from "../Common/Button/Button.jsx";
import Pagination from "../Common/Pagination/Pagination.jsx";
import Warn from "../Common/Warning/Warn.jsx";
import { useSelectMyStartup } from "../../api/queries/selectionQuery.js";

export default function MySelectionModal({ sessionId, onClose }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    data: recentSelect,
    isLoading: recentLoading,
    isError: recentError,
  } = useGetRecentSelectionList();

  const { data, isLoading, isError } = useGetStartupList({
    page: currentPage,
    search,
  });

  const selectMyStartup = useSelectMyStartup();
  const handleSelect = (startup) => {
    const startupId = startup.startupId || startup.id;
    selectMyStartup.mutate(
      { id: startupId, sessionId },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const recentStartups = recentSelect?.list;
  const startups = data?.list;
  const totalCount = data?.totalCount;
  const totalPages = data?.totalPages;

  return (
    <ModalContainer>
      {(recentLoading || isLoading) && <Loading />}
      {(recentError || isError) && (
        <Warn
          variant="error"
          title="오류발생"
          description={"데이터를 불러오는 중 오류가 발생했습니다."}
        />
      )}
      {!recentLoading && !isLoading && !recentError && !isError && (
        <div className={styles.wrap}>
          <div className={styles.header}>
            <div className={styles.title}>
              <h2>나의 기업 선택하기</h2>
              <img src={ic_X} alt="ic_X" onClick={onClose} />
            </div>
            <SearchInput setSearchKeyword={(search) => setSearch(search)} />
          </div>

          <div className={styles.startups}>
            <h3 className={styles[`sub-title`]}>
              최근 선택된 기업 ({recentStartups.length && startups.length})
            </h3>
            <ul className={styles.list}>
              {recentStartups.slice(0, 5).map((startup) => (
                <li key={startup.id}>
                  <StartupTitle item={startup.startup} isCategory={true} />
                  <Button
                    type="submit"
                    label="선택하기"
                    styleType="square"
                    width="11rem"
                    color="var(--primary-orange)"
                    onClick={() => handleSelect(startup)}
                  />
                  {/* {existingSelectedStartups.some(
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
                )} */}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.startups}>
            <h3 className={styles[`sub-title`]}>기업 목록 ({totalCount})</h3>
            <ul className={styles.list}>
              {startups.map((startup) => (
                <li key={startup.id}>
                  <StartupTitle item={startup} isCategory={true} />
                  <Button
                    label="선택하기"
                    styleType="square"
                    width="11rem"
                    color="var(--primary-orange)"
                    onClick={() => handleSelect(startup)}
                  />
                </li>
              ))}
            </ul>
          </div>
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
