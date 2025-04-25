import styles from "./CompareSelection.module.css";
import { useState } from "react";
import CompareSelectionModal from "./CompareSelectionModal";
import Button from "../Common/Button/Button";
import StartupTitle from "../Common/StartupTitle/StartupTitle";
import ic_minus from "../../assets/ic_minus.svg";
import { useCancelCompreStartups } from "../../api/queries/selectionQuery";

export default function CompareSelection({
  sessionId,
  selectedStartup,
  compareSelectedStartups,
  setCompareStartups,
}) {
  const [isModal, setIsModal] = useState(false);

  const cancelCompareStartup = useCancelCompreStartups();
  const handleCancel = (startup) => {
    setCompareStartups((prev) =>
      prev.filter((selected) => selected.id !== startup.id)
    );
    cancelCompareStartup.mutate({ ids: [startup.id], sessionId });
  };

  return (
    <section className={styles.wrap}>
      <div className={styles[`selected-wrap`]}>
        <div className={styles[`title-button`]}>
          <h2>어떤 기업이 궁금하세요? (최대 5개)</h2>
          <Button
            label="기업 추가하기"
            width="15rem"
            onClick={() => setIsModal(true)}
          />
        </div>
        <div className={styles[`border-box`]}>
          <div className={styles[`selected-startup`]}>
            {compareSelectedStartups.length > 0 ? (
              <div className={styles.selected}>
                {compareSelectedStartups.map((startup) => (
                  <div key={startup.id} className={styles[`selected-card`]}>
                    <img
                      src={ic_minus}
                      alt="cancel"
                      onClick={() => handleCancel(startup)}
                    />
                    <StartupTitle
                      key={startup.id}
                      item={startup}
                      isCategory={true}
                      direction="세로"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.empty}>
                <p>
                  아직 추가된 기업이 없어요.
                  <br />
                  버튼을 눌러 기업을 추가해보세요!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModal && (
        <CompareSelectionModal
          sessionId={sessionId}
          selectedStartup={selectedStartup}
          selectedStartups={compareSelectedStartups}
          setCompareStartups={setCompareStartups}
          onCancel={handleCancel}
          onClose={() => setIsModal(false)}
        />
      )}
    </section>
  );
}
