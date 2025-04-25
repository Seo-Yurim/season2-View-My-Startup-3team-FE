import styles from "./ModalContainer.module.css";

export default function ModalContainer({ children, onClick }) {
  return (
    <div className={styles.overlay} onClick={onClick}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
