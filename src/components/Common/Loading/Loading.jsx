import styles from "./Loading.module.css";
import logo from "../../../assets/img_logo_pc.svg";

export default function Loading() {
  return (
    <div className={styles.wrap}>
      <div className={styles[`img-text`]}>
        <img className={styles.logo} src={logo} />
        <p className={styles.text}>
          View My Startup은 투자자들이 스타트업 정보를 확인하고, <br />
          다양한 기준으로 비교해 투자 시뮬레이션을 할 수 있는 서비스입니다.
        </p>
      </div>
      <div className={styles.loading}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
}
