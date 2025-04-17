import styles from "./Button.module.css";

export default function Button({
  type = "default",
  label,
  onClick,
  isDisabled = false,
}) {
  return (
    <>
      <button
        className={`${styles.button} ${styles[type]}`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {label}
      </button>
    </>
  );
}
