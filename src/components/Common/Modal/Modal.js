import styles from './Modal.module.css';

export default function Modal({ children }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
