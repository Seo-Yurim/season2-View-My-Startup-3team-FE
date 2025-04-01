import styles from './InvestmentDropdown.module.css';
import arrowDown from '../../assets/ic_toggle.svg';
import { useState, useRef, useEffect } from 'react';

export default function InvestmentDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [orderBy, setOrderBy] = useState();
  const dropdownRef = useRef(null);

  // 메뉴 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // 마우스 클릭 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const options = [
    {
      value: 'sim_invest_desc',
      label: 'View My Startup 누적 투자 금액 높은 순'
    },
    {
      value: 'sim_invest_asc',
      label: 'View My Startup 누적 투자 금액 낮은 순'
    },
    {
      value: 'actual_invest_desc',
      label: '실제 누적 투자 금액 높은 순'
    },
    {
      value: 'actual_invest_asc',
      label: '실제 누적 투자 금액 낮은 순'
    }
  ];

  const handleOptionClick = (val) => {
    setOrderBy(val);
    setIsOpen(false);
  };

  return (
    <div className={styles.menu} ref={dropdownRef}>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        {options.find((option) => option.value === orderBy)?.label ||
          '정렬 선택...'}
        <img className={styles.icon} src={arrowDown} alt="드롭다운 아이콘" />
      </div>
      {isOpen && (
        <ul className={styles.options}>
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.option}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
