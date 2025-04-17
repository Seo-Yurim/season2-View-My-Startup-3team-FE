import classNames from "classnames"; // npm install classnames 해야 함
import warnIcon from "../../../assets/warn.svg";
import styles from "./Warn.module.css";

export default function Warn({
  className,
  variant = "",
  title = "",
  description = "",
}) {
  return (
    <div className={classNames(styles.warn, styles[variant], className)}>
      <img className={styles.icon} src={warnIcon} alt="경고" />
      <h2
        className={classNames(
          styles.title,
          { [styles.errorTitle]: variant === "error" } // variant가 error일 때 적용
        )}
      >
        {title}
      </h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
