import styles from "./Button.module.css";

export default function Button({
  type = "button",
  styleType = "default",
  label,
  onClick,
  isDisabled = false,
  width = "100%",
}) {
  return (
    <>
      <button
        type={type}
        className={`${styles.button} ${styles[styleType]}`}
        style={{ width: width }}
        onClick={onClick}
        disabled={isDisabled}
      >
        {label}
      </button>
    </>
  );
}
