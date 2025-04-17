import styles from './ComparisonHeader.module.css';
import ComparisonDropdown from './ComparisonDropdown';

export default function ComparisonHeader({ setSortOption }) {
  return (
    <div className={styles.header}>
      <h1>비교 현황</h1>
      <div className={styles.searchDropdownContainer}>
        <ComparisonDropdown setSortOption={setSortOption} />
      </div>
    </div>
  )
}