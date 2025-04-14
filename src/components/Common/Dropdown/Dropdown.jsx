import styles from "./Dropdown.module.css";
import arrowDown from "../../../assets/ic_toggle.svg";
import { useState, useRef, useEffect } from "react";

export default function Dropdown({ sortOptions, setSortOrder, order, sort }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const currentLabel = Object.entries(sortOptions).find(
    ([, value]) => value[0] === order && value[1] === sort
  )?.[0];

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
    const [orderValue, sortValue] = sortOptions[val];
    setSortOrder(orderValue, sortValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.menu} ref={dropdownRef}>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        <p className={styles.currentLabel}>{currentLabel}</p>
        <img className={styles.icon} src={arrowDown} alt="드롭다운 아이콘" />
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {Object.keys(sortOptions).map((option, idx) => (
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
