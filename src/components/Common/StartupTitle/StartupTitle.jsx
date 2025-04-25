import styles from "./StartupTitle.module.css";
import noImageIcon from "../../../assets/no-image.png";

export default function StartupTitle({
  item,
  isCategory = false,
  direction = "가로",
}) {
  const image = item?.image || item?.startup?.image || noImageIcon;
  const name = item?.name || item?.startup?.name || "이름 없음";
  const category = item?.categoryName || item?.category?.category;

  return (
    <div className={direction === "가로" ? styles.row : styles.column}>
      <img src={image} alt="기업 로고" loading="lazy" />
      <div className={styles.title}>
        <p className={styles.name}>{name}</p>
        {isCategory && <p className={styles.category}>{category}</p>}
      </div>
    </div>
  );
}
