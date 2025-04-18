import styles from "./TextArea.module.css";

export default function TextArea({
  label,
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
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={styles.textarea}
        style={{
          border: error
            ? "0.1rem solid var(--error-color)"
            : "0.1rem solid var(--secondary-gray-200)",
        }}
      />
      {error && <div className="form-error">{error}</div>}
    </>
  );
}
