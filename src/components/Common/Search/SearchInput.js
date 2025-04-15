import { useState } from 'react';
import styles from './SearchInput.module.css';
import searchIcon from '../../../assets/ic_search.svg';
import clearIcon from '../../../assets/ic_clear.png';

export default function SearchInput({ setSearchKeyword }) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setSearchKeyword(e.target.value);
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchKeyword('');
  };

  return (
    <div className={styles.searchContainer}>
      {!searchText && (
        <img src={searchIcon} alt="검색 아이콘" className={styles.iconLeft} />
      )}
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        value={searchText}
        onChange={handleInputChange}
        className={styles.inputField}
        style={{ paddingLeft: searchText ? '1.2rem' : '3.6rem' }}
      />
      {searchText && (
        <div className={styles.iconsRight}>
          <img
            src={clearIcon}
            alt="clear-icon"
            className={styles.clearIcon}
            onClick={clearSearch}
          />
          <img
            src={searchIcon}
            alt="검색 아이콘"
            className={styles.iconRight}
          />
        </div>
      )}
    </div>
  );
}
