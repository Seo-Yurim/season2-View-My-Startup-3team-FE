import styles from './MySelectionModal.module.css';
import ic_X from '../../assets/ic_x.svg';
import ic_search from '../../assets/ic_search.svg';
import ic_x_circle_small from '../../assets/ic_x_circle_small.svg';
import useFetchMyStartup from '../../hooks/useFetchMyStartup.js';
import useFetchRecent from '../../hooks/useFetchRecent.js';
import { useState } from 'react';
import noImageIcon from '../../assets/no-image.png';

export default function MySelectionModal({
  onClose,
  onSelectStartup,
  existingSelectedStartups
}) {
  const { recentStartups } = useFetchRecent();
  const { startups, searchStartups } = useFetchMyStartup();
  const [searchText, setSearchText] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchText(newValue);

    if (newValue) {
      searchStartups(newValue);
    }
  };

  const handleSearch = () => {
    if (searchText) {
      searchStartups(searchText);
    }
  };

  const handelClear = () => {
    setSearchText('');
    searchStartups('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSelect = (startup) => {
    onSelectStartup(startup);
    onClose();
  };

  const inputPadding = searchText ? '1.2rem' : '1.2rem 1.2rem 1.2rem 3.7rem';
  return (
    <div className={styles.overlay}>
      <form className={styles.form}>
        <div className={styles.header}>
          <h2>나의 기업 선택하기</h2>
          <img src={ic_X} alt="ic_X" onClick={onClose} />
        </div>
        <label className={styles.search}>
          {!searchText && (
            <img className={styles.searchImg} src={ic_search} alt="ic_search" />
          )}
          <input
            type="text"
            value={searchText}
            onChange={handleChange}
            placeholder="검색어를 입력해주세요"
            onKeyDown={handleKeyDown}
            style={{ padding: inputPadding }}
          />
          <div className={styles.searchImgBlock}>
            {searchText && (
              <>
                <img
                  src={ic_x_circle_small}
                  alt="ic_x_circle_small"
                  onClick={handelClear}
                />
                <img src={ic_search} alt="ic_search" onClick={handleSearch} />
              </>
            )}
          </div>
        </label>
        {!searchText && (
          <div>
            <h3 className={styles.title}>
              최근 선택된 기업 ({recentStartups.length && startups.length})
            </h3>
            <ul>
              {recentStartups.slice(0, 5).map((startup) => (
                <li key={startup.id} className={styles.list}>
                  <div className={styles.listStartup}>
                    <img
                      src={startup.startup.image || noImageIcon}
                      alt={`${startup.name} 로고`}
                      style={{
                        width: '3.2rem',
                        height: '3.2rem',
                        marginRight: '0.8rem',
                        verticalAlign: 'middle',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        objectFit: 'cover'
                      }}
                    />
                    <span className={styles.name}>{startup.startup.name}</span>
                    <span className={styles.category}>
                      {startup.startup.category.category}
                    </span>
                  </div>
                  {!existingSelectedStartups.some(
                    (existing) => existing.id === startup.startup.id
                  ) && (
                    <button
                      type="button"
                      className={styles.selectionBtn}
                      onClick={() => handleSelect(startup.startup)}
                    >
                      선택하기
                    </button>
                  )}
                  {existingSelectedStartups.some(
                    (existing) => existing.id === startup.startup.id
                  ) && (
                    <button
                      type="button"
                      className={styles.compareSelectedBtn}
                      onClick={() => handleSelect(startup.startup)}
                      disabled={true}
                    >
                      비교 기업
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {searchText && (
          <div>
            <h3 className={styles.title}>검색 결과 ({startups.length})</h3>
            <ul>
              {startups.map((startup) => (
                <li key={startup.id} className={styles.list}>
                  <div className={styles.listStartup}>
                    <img
                      src={startup.image || noImageIcon}
                      alt={`${startup.name} 로고`}
                      style={{
                        width: '3.2rem',
                        height: '3.2rem',
                        marginRight: '0.8rem',
                        verticalAlign: 'middle',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        objectFit: 'cover'
                      }}
                    />
                    <span className={styles.name}>{startup.name}</span>
                    <span className={styles.category}>
                      {startup.category.category}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={styles.selectionBtn}
                    onClick={() => handleSelect(startup)}
                  >
                    선택하기
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}
