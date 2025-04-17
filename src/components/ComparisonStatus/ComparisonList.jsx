import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './ComparisonList.module.css';
import useFetchStartups from '../../hooks/useFetchStartups';
import Pagination from '../Common/Pagination/Pagination';
import noImageIcon from '../../assets/no-image.png';
import { formatAmount } from '../../utils/formatAmount';
import ComparisonHeader from './ComparisonHeader';
import Warn from '../Common/Warning/Warn';

const MAX_ITEMS = 10;

export default function ComparisonList() {
  const maxItems = MAX_ITEMS;
  const [sortOption, setSortOption] = useState('selected_count_desc'); // 기본 정렬 옵션 추가y
  const [currentPage, setCurrentPage] = useState(1); // currentPage 상태를 여기서 관리
  const navigate = useNavigate();

  const { startups, error, setOrder, setSort, totalCount, showLoading } =
    useFetchStartups(currentPage, maxItems, 'selected_count', 'desc'); // currentPage를 인자로 전달

  const totalPages = Math.ceil(totalCount / maxItems);

  useEffect(() => {
    // 마지막 언더바를 기준으로 나누기 위해 정규식 사용
    const [order, sort] = sortOption.split(/_(?=[^_]*$)/);
    setOrder(order);
    setSort(sort);
  }, [sortOption, setOrder, setSort]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowClick = (id) => {
    navigate(`/startup/${id}`);
  };

  if (error) {
    //return <div className="error-message">{error}</div>;
    return <Warn variant="error" title="오류발생" description={error} />;
  }

  if (showLoading) {
    return <div>목록을 불러오는 중입니다....</div>;
  }
  return (
    <>
      <ComparisonHeader setSortOption={setSortOption} />

      <div style={{ width: '100%', overflowX: 'auto' }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '6.8rem' }}>순위</th>
              <th style={{ width: '21.3rem' }}>기업명</th>
              <th style={{ width: '30.4rem' }}>기업소개</th>
              <th style={{ width: '15.4rem' }}>카테고리</th>
              <th style={{ width: '15.4rem' }}>나의 기업 선택 횟수</th>
              <th style={{ width: '15.4rem' }}>비교 기업 선택 횟수</th>
            </tr>
          </thead>
          <tbody>
            {startups.map((startup) => (
              <tr
                key={startup.id}
                onClick={() => handleRowClick(startup.id)}
                style={{ cursor: 'pointer' }}
              >
                <td>{startup.rank}위</td>
                <td style={{ textAlign: 'left' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle'
                    }}
                  >
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
                  </span>
                  <span
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle'
                    }}
                  >
                    {startup.name}
                  </span>
                </td>
                <td className={styles.description}>{startup.description}</td>
                <td>{startup.categoryName}</td>
                <td style={{ textAlign: 'center' }}>
                  {formatAmount(startup.selectedCount)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {formatAmount(startup.comparedCount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
