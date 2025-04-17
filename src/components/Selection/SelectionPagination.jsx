import styles from './SelectionPagination.module.css';
import arrowLeftIcon from '../../assets/ic_arrow_left.svg';
import arrowRightIcon from '../../assets/ic_arrow_right.svg';

const MAX_PAGE_DISPLAY = 5;

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  // 한 번에 보여줄 페이지 수

  const maxPageDisplay = MAX_PAGE_DISPLAY;
  const pageNumbers = [];

  // 페이지 그룹 계산 로직
  const currentGroup = Math.ceil(currentPage / maxPageDisplay);
  const startPage = (currentGroup - 1) * maxPageDisplay + 1;
  const endPage = Math.min(totalPages, startPage + maxPageDisplay - 1);

  // 페이지 번호 추가
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // 이전 그룹 버튼 핸들러
  const handlePrevGroupClick = (e) => {
    e.preventDefault();
    const newStartPage = startPage - maxPageDisplay;
    if (newStartPage > 0) {
      onPageChange(newStartPage + maxPageDisplay - 1); // 이전 그룹의 마지막 페이지로 이동
    }
  };

  // 다음 그룹 버튼 핸들러
  const handleNextGroupClick = (e) => {
    e.preventDefault();
    const newStartPage = startPage + maxPageDisplay;
    if (newStartPage <= totalPages) {
      onPageChange(newStartPage); // 다음 그룹의 첫 번째 페이지로 이동
    }
  };

  return (
    <div className={styles.pagination}>
      {startPage > 1 && (
        <button
          className={styles.paginationButton}
          onClick={handlePrevGroupClick}
        >
          <img src={arrowLeftIcon} alt="Previous" />
        </button>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`${styles.paginationButton} ${
            currentPage === page ? styles.paginationButtonActive : ''
          }`}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(page); // 페이지 변경
          }}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <button
          className={styles.paginationButton}
          onClick={handleNextGroupClick}
        >
          <img src={arrowRightIcon} alt="Next" />
        </button>
      )}
    </div>
  );
}
