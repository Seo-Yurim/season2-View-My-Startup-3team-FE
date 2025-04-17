import styles from "./ModalContainer.module.css";

export default function ModalContainer({ children }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
