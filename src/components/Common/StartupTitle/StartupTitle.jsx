import styles from "./StartupTitle.module.css";
import noImageIcon from "../../../assets/no-image.png";

export default function StartupTitle({ item, isCategory = false }) {
  return (
    <div className={styles.wrap}>
      <img src={item.image || noImageIcon} alt="기업 로고" loading="lazy" />
      <div className={styles.title}>
        <p className={styles.name}>{item.name}</p>
        {isCategory && (
          <p className={styles.category}>
            {item.categoryName || item.category?.category}
          </p>
        )}
      </div>
    </div>
  );
}
