import styles from "./Input.module.css";

export default function Input({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}) {
  return (
    <>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={styles.input}
        style={{
          border: error
            ? "0.1rem solid var(--error-color)"
            : "0.1rem solid var(--secondary-gray-200)",
        }}
      />
      {error && <div className={styles.error}>{error}</div>}
    </>
  );
}
