import styles from "./StartupInfo.module.css";
import noImageIcon from "../../assets/no-image.png";
import { formatAmount } from "../../utils/formatAmount";

export default function StartupInfo({ startup }) {
  return (
    <section className={styles.wrapper}>
      <div className={styles[`logo-title`]}>
        <img
          src={startup.image || noImageIcon}
          loading="lazy"
          alt="기업 로고"
        />
        <div className={styles.title}>
          <h1>{startup.name}</h1>
          <p>{startup.categoryName}</p>
        </div>
      </div>

      <div className={styles.infos}>
        <div className={styles.info}>
          <p className={styles.label}>누적 투자 금액</p>
          <p className={styles.value}>{formatAmount(startup.simInvest)} 원</p>
        </div>
        <div className={styles.info}>
          <p className={styles.label}>매출액</p>
          <p className={styles.value}>{formatAmount(startup.revenue)} 원</p>
        </div>
        <div className={styles.info}>
          <p className={styles.label}>고용 인원</p>
          <p className={styles.value}>{formatAmount(startup.employees)}명</p>
        </div>
      </div>

      <div className={styles.description}>
        <p className={styles.label}>기업 소개</p>
        <p
          className={styles.value}
          dangerouslySetInnerHTML={{
            __html: startup.description.replace(/\n/g, "<br />"),
          }}
        />
      </div>
    </section>
  );
}
