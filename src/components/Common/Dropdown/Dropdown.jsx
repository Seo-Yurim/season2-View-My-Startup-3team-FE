import styles from "./Dropdown.module.css";
import arrowDown from "../../../assets/ic_toggle.svg";
import { useState, useRef, useEffect } from "react";

const options = {
  "View My Startup 누적 투자 금액 높은 순": ["sim_invest", "desc"],
  "View My Startup 누적 투자 금액 낮은 순": ["sim_invest", "asc"],
  "실제 누적 투자 금액 높은 순": ["actual_invest", "desc"],
  "실제 누적 투자 금액 낮은 순": ["actual_invest", "asc"],
};

export default function Dropdown({ setSortOrder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLabel, setCurrentLabel] = useState(Object.keys(options)[0]);
  const dropdownRef = useRef(null);

  // 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    // 마우스 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleOptionClick = (val) => {
    const [orderValue, sortValue] = options[val];
    setSortOrder(orderValue, sortValue);
    setCurrentLabel(val);
    setIsOpen(false);
  };

  return (
    <div className={styles.menu} ref={dropdownRef}>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        <p className={styles.currentLabel}>
          {currentLabel || Object.keys(options)[0]}
        </p>
        <img className={styles.icon} src={arrowDown} alt="드롭다운 아이콘" />
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {Object.keys(options).map((option, idx) => (
            <li
              key={idx}
              className={styles.option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
