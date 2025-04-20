import styles from "./StartupDetailInfo.module.css";
import { formatAmount } from "../../utils/formatAmount";

export default function StartupDetailInfo({ startup }) {
  return (
    <div className={styles.body}>
      <div className={styles.infos}>
        <div className={styles.info}>
          <p>누적 투자 금액</p>
          <h1>{formatAmount(startup.simInvest)} 원</h1>
        </div>
        <div className={styles.info}>
          <p>매출액</p>
          <h1>{formatAmount(startup.revenue)} 원</h1>
        </div>
        <div className={styles.info}>
          <p>고용 인원</p>
          <h1>{formatAmount(startup.employees)}명</h1>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <div className={styles.description}>
          <h1>기업 소개</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: startup.description.replace(/\n/g, "<br />"),
            }}
          />
        </div>
      </div>
    </div>
  );
}
