//import { useState } from 'react';
import styles from './StartupList.module.css';
import useFetchStartups from '../../hooks/useFetchStartups';

export default function StartupList() {
  const MAX_ITEMS = 10;

  const maxItems = MAX_ITEMS;
  //const [searchKeyword, setSeacrchKeyword] = useState('');

  const {
    startups,
    error,
    //order,
    //setOrder,
    //sort,
    //setSort,
    currentPage,
    //setCurrentPage,
    //totoalCount,
    //setSearch,
    showLoading,
  } = useFetchStartups(1, maxItems, 'total_investment', 'desc');

  //const totalPages = Math.ceil(totoalCount / maxItems);

  if (error) {
    return <div className='error-message'>{error}</div>;
  }
  return (
    <div>
      <table className={styles.table}>
      <thead>
        <tr>
          <th>순위</th>
          <th>기업명</th>
          <th>기업소개</th>
          <th>카테고리</th>
          <th>누적 투자 금액</th>
          <th>매출액</th>
          <th>고용 인원</th>
        </tr>
      </thead>
      <tbody>
      { showLoading ? (
        <tr>
          <td colSpan="7">목록을 불러오는 중입니다....</td>
        </tr>
      ) : (
      startups.map((startup, index) => (
        <tr key={startup.id}>
          <td>{index += 1 + (currentPage -1) * MAX_ITEMS}위</td>
          <td>{startup.name}</td>
          <td>{startup.description}</td>
          <td>{startup.categoryId}</td>
          <td>{startup.simInvest}</td>
          <td>{startup.revenue}</td>
          <td>{startup.employees}</td>          
        </tr>
        ))

      )}
      </tbody>
      </table>
    </div>
  )
}