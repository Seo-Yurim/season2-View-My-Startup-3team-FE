import styles from './InvestmentHeader.module.css';
import InvestmentDropdown from './InvestmentDropdown';

export default function InvestmentHeader() {
  return (
    <div className={styles.header}>
      <h1>투자 현황</h1>
      <InvestmentDropdown setSortOption="investment_desc" />
    </div>
  );
}
