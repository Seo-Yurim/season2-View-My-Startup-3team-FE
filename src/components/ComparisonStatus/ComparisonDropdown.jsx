import styles from './ComparisonDropdown.module.css';
import arrowDown from '../../assets/ic_toggle.svg';
import { useEffect, useRef, useState } from 'react';
//import { useSort } from '../../contexts/SortContext';

export default function ComparisonDropdown({ setSortOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('selected_count_desc');
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
    { value: 'selected_count_desc', label: '나의 기업 선택 횟수 높은순' },
    { value: 'selected_count_asc', label: '나의 기업 선택 횟수 낮은순' },
    { value: 'compared_count_desc', label: '비교 기업 선택 횟수 높은순' },
    { value: 'compared_count_asc', label: '비교 기업 선택 횟수 낮은순' },
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
