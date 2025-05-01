import warnIcon from "../../../assets/warn.svg";
import styles from "./Warn.module.css";

export default function Warn({ title = "", description = "" }) {
  return (
    <div className={styles.warn}>
      <img className={styles.icon} src={warnIcon} alt="경고" />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
