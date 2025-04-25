import styles from "./CompareSelection.module.css";
import { useState } from "react";
import CompareSelectionModal from "./CompareSelectionModal";
import ic_minus from "../../assets/ic_minus.svg";
import noImageIcon from "../../assets/no-image.png";
import Button from "../Common/Button/Button";

export default function CompareSelection({
  compareSelectedStartups,
  setCompareSelectedStartups,
}) {
  const [isComparedModal, setIsComparedModal] = useState(false);

  //   const handleCompareRemoveStartups = (id) => {
  //     setCompareSelectedStartups((prev) =>
  //       prev.filter((startup) => startup.id !== id)
  //     );
  //   };

  //   const handleCancelCompare = async () => {
  //     const ids = compareSelectedStartups.map((startup) => startup.id);
  //     await fetchCancelComparison(ids);
  //   };

  return (
    <section className={styles.wrap}>
      <div className={styles[`selected-wrap`]}>
        <div className={styles[`title-button`]}>
          <h2>어떤 기업이 궁금하세요? (최대 5개)</h2>
          <Button label="기업 추가하기" width="20rem" />
        </div>
        <div className={styles[`border-box`]}>
          <div className={styles[`selected-startup`]}>
            <div className={styles.selected}>
              <p>
                아직 추가된 기업이 없어요.
                <br />
                버튼을 눌러 기업을 추가해보세요!
              </p>
            </div>
          </div>
        </div>
      </div>

      {isComparedModal && (
        <CompareSelectionModal
          selectedStartups={compareSelectedStartups}
          onSelectStartup={(startups) => setCompareSelectedStartups(startups)}
          onClose={() => setIsComparedModal(false)}
          existingSelectedStartups={""}
        />
      )}
    </section>
  );
}
