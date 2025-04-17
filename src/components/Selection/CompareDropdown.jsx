import styles from './CompareDropdown.module.css';
import arrowDown from '../../assets/ic_toggle.svg';
import { useEffect, useRef, useState } from 'react';
//import { useSort } from '../../contexts/SortContext';

export default function CompareDropdown({ setSortOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('simInvest_desc');
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
    { value: 'simInvest_desc', label: '누적 투자금액 높은순' },
    { value: 'simInvest_asc', label: '누적 투자금액 낮은순' },
    { value: 'revenue_desc', label: '매출액 높은순' },
    { value: 'revenue_asc', label: '매출액 낮은순' },
    { value: 'employees_desc', label: '고용인원 높은순' },
    { value: 'employees_asc', label: '고용인원 적은순' }
  ];

  const handleOptionClick = (value) => {
    setSelectedOption(value); // selectedOption 상태 업데이트
    setSortOption(value); // 부모 컴포넌트로 선택된 옵션 전달
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={styles.menu}>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        {options.find((option) => option.value === selectedOption)?.label ||
          'Select...'}
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
