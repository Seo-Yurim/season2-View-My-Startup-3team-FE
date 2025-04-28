import styles from "./Button.module.css";

// styleType : default, solid, square
export default function Button({
  type = "button",
  styleType = "default",
  label,
  onClick,
  isDisabled = false,
  width = "100%",
  img,
  color,
}) {
  return (
    <>
      <button
        type={type}
        className={`${styles.button} ${styles[styleType]}`}
        style={{ width: width, borderColor: color }}
        onClick={onClick}
        disabled={isDisabled}
      >
        <span className={styles.content}>
          {img && <img src={img} alt="버튼 아이콘" />}
          <p className={styles.label} style={{ color }}>
            {label}
          </p>
        </span>
      </button>
    </>
  );
}
