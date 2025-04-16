import styles from "./StartupTitle.module.css";
import noImageIcon from "../../../assets/no-image.png";

export default function StartupTitle({ item }) {
  return (
    <div className={styles.name}>
      <img src={item.startup.image || noImageIcon} alt={item.startup.name} />
      {item.startup.name}
    </div>
  );
}
