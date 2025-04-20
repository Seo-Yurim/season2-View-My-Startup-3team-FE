import styles from "./PasswordInput.module.css";
import visibilityOff from "../../../../assets/btn_visibility_off.svg";
import visibilityOn from "../../../../assets/btn_visibility_on.svg";
import { useState } from "react";

export default function PasswordInput({
  label,
  id,
  placeholder,
  value,
  onChange,
  onKeyDown,
  onBlur,
  error,
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={styles[`pwd-wrap`]}>
        <input
          type={isVisible ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          style={{
            border: error
              ? "0.1rem solid var(--error-color)"
              : "0.1rem solid var(--secondary-gray-200)",
          }}
        />
        <img
          src={isVisible ? visibilityOff : visibilityOn}
          alt={isVisible ? "비밀번호 표시" : "비밀번호 숨기기"}
          onClick={() => setIsVisible((prev) => !prev)}
        />
      </div>
      {error && <div className="form-error">{error}</div>}
    </>
  );
}
