import styles from "./Button.module.css";

export default function Button({
  type = "button",
  styleType = "default",
  label,
  onClick,
  isDisabled = false,
}) {
  return (
    <>
      <button
        type={type}
        className={`${styles.button} ${styles[styleType]}`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {label}
      </button>
    </>
  );
}
