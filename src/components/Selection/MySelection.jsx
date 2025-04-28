import styles from "./MySelection.module.css";
import btn_plus from "../../assets/btn_plus.svg";
import MySelectionModal from "../Modal/MySelectionModal/MySelectionModal";
import { useState } from "react";
import ic_restart from "../../assets/ic_restart.svg";
import StartupTitle from "../Common/StartupTitle/StartupTitle";
import Button from "../Common/Button/Button";
import { useCancelMyStartup } from "../../api/queries/selectionQuery";

export default function MySelection({
  sessionId,
  selectedStartup,
  compareStartups,
  onReset,
  isComparisonDone,
  setIsComparisonDone,
}) {
  const [isModal, setIsModal] = useState(false);

  // 내 기업 선택 취소
  const canceltMyStartup = useCancelMyStartup();
  const handleCancel = (startup) => {
    setIsComparisonDone(false);
    const startupId = startup.startupId || startup.id;
    canceltMyStartup.mutate({ id: startupId, sessionId });
  };

  return (
    <section className={styles.wrap}>
      <div className={styles[`selecte-wrap`]}>
        <div className={styles.header}>
          <h2>
            {selectedStartup ? "내가 선택한 기업" : "나의 기업을 선택해주세요!"}
          </h2>
          {selectedStartup &&
            compareStartups.length > 0 &&
            (isComparisonDone ? (
              <Button
                label="다른 기업 비교하기"
                width="15rem"
                onClick={() => setIsComparisonDone(false)}
              />
            ) : (
              <Button
                img={ic_restart}
                label="전체 초기화"
                width="15rem"
                onClick={onReset}
              />
            ))}
        </div>
        <div className={styles[`border-box`]}>
          <div className={styles[`selecte-startup`]}>
            {selectedStartup ? (
              <div className={styles.selected}>
                <StartupTitle
                  item={selectedStartup || selectedStartup?.startup}
                  isCategory={true}
                  direction="세로"
                />
                <Button
                  label="선택 취소"
                  styleType="square"
                  width="12rem"
                  color="var(--primary-orange"
                  onClick={() => handleCancel(selectedStartup)}
                />
              </div>
            ) : (
              <div className={styles.empty}>
                <img
                  src={btn_plus}
                  alt="추가 아이콘"
                  onClick={() => setIsModal(true)}
                />
                <p>기업 추가</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModal && (
        <MySelectionModal
          sessionId={sessionId}
          compareStartups={compareStartups}
          onClose={() => setIsModal(false)}
        />
      )}
    </section>
  );
}
