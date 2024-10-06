import styles from './CompareSelectionModal.module.css';
import ic_X from '../../assets/ic_x.svg';
import ic_search from '../../assets/ic_search.svg';
import ic_x_circle_small from '../../assets/ic_x_circle_small.svg';
import ic_check from '../../assets/ic_check.svg';
import useFetchRecent from '../../hooks/useFetchRecent';
import { useState } from 'react';

export default function MySelectionModal({ onClose, onSelectStartup }) {
  const { startups } = useFetchRecent();
  const [searchText, setSearchText] = useState('');
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [selectCompareStartups, setSelectComparedStartups] = useState([]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchText(newValue);

    if (!newValue) {
      setFilteredStartups([]);
    }
  };

  const handleSearch = () => {
    if (!searchText) return;
    const results = startups.filter((startup) =>
      startup.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredStartups(results);
  };

  const handleClear = () => {
    setSearchText('');
    setFilteredStartups([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSelectCompareStartups = (startup) => {
    if (selectCompareStartups.includes(startup)) {
      setSelectComparedStartups(
        selectCompareStartups.filter((s) => s !== startup)
      );
      onSelectStartup(selectCompareStartups.filter((s) => s !== startup));
    } else {
      setSelectComparedStartups([...selectCompareStartups, startup]);
      onSelectStartup([...selectCompareStartups, startup]);
    }
  };

  const inputPadding = searchText ? '1.2rem' : '1.2rem 1.2rem 1.2rem 3.7rem';

  const StartupList = ({
    title,
    startups,
    selectCompareStartups,
    handleSelectCompareStartups
  }) => (
    <div>
      <h3 className={styles.title}>
        {title} ({startups.length})
      </h3>
      <ul>
        {startups.map((startup) => (
          <li className={styles.list} key={startup.id}>
            <div className={styles.listStartup}>
              <img src={startup.image} alt="startupImage" />
              <span className={styles.name}>{startup.name}</span>
              <span className={styles.category}>
                {startup.category.category}
              </span>
            </div>
            <button
              type="button"
              className={`${styles.selectionBtn} ${
                selectCompareStartups.includes(startup)
                  ? styles.completeBtn
                  : styles.selectionBtn
              }`}
              onClick={() => handleSelectCompareStartups(startup)}
              disabled={selectCompareStartups.includes(startup)}
            >
              {selectCompareStartups.includes(startup) ? (
                <>
                  <img
                    src={ic_check}
                    alt="checkImg"
                    className={styles.checkIcon}
                  />
                  선택완료
                </>
              ) : (
                '선택하기'
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={styles.overlay}>
      <form className={styles.form}>
        <div className={styles.header}>
          <h2>비교할 기업 선택하기</h2>
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
                  onClick={handleClear}
                />
                <img src={ic_search} alt="ic_search" onClick={handleSearch} />
              </>
            )}
          </div>
        </label>
        {selectCompareStartups.length > 0 && (
          <div className={styles.selectStartup}>
            <h3 className={styles.title}>
              선택한 기업 ({selectCompareStartups.length})
            </h3>
            <ul>
              {selectCompareStartups.map((startup) => (
                <li key={startup.id} className={styles.list}>
                  <div className={styles.listStartup}>
                    <img src={startup.image} alt="startupImage" />
                    <span className={styles.name}>{startup.name}</span>
                    <span className={styles.category}>
                      {startup.category.category}
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`${styles.selectionBtn} ${styles.canselBtn}`}
                    onClick={() => handleSelectCompareStartups(startup)}
                  >
                    선택 해제
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!searchText && (
          <StartupList
            title="기업"
            startups={startups}
            selectCompareStartups={selectCompareStartups}
            handleSelectCompareStartups={handleSelectCompareStartups}
          />
        )}
        {searchText && (
          <StartupList
            title="검색 결과"
            startups={filteredStartups}
            selectCompareStartups={selectCompareStartups}
            handleSelectCompareStartups={handleSelectCompareStartups}
          />
        )}
      </form>
    </div>
  );
}
