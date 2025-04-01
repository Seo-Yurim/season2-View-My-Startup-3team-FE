import styles from './InvestmentList.module.css';
import noImageIcon from '../../assets/no-image.png';
import { useState } from 'react';
import { formatAmount } from '../../utils/formatAmount';
import Pagination from '../Common/Pagination';
import { useNavigate } from 'react-router-dom';
import { useGetInvestmentList } from '../../api/queries/investmentQuery.js';
import { getInvestmentTotal } from '../../api/InvestmentService.js';

export default function InvestmentList() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const [params, setParams] = useState({
    order: 'sim_invest',
    sort: 'desc'
  });

  const { data, isLoading, isError } = useGetInvestmentList({
    currentPage,
    order: params.order,
    sort: params.sort
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error..</div>;

  const list = data.list;
  const totalCount = getInvestmentTotal();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStartupClick = (item) => {
    navigate(`/startup/${item.startup.id}`);
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th style={{ width: '6.8rem' }}>순위</th>
              <th style={{ width: '21.3rem' }}>기업 명</th>
              <th style={{ width: '30.4rem' }}>기업 소개</th>
              <th style={{ width: '15.4rem' }}>카테고리</th>
              <th style={{ width: '23.1rem' }}>
                View My Startup
                <br className={styles.br} /> 누적 투자 금액
              </th>
              <th style={{ width: '23rem' }}>실제 누적 투자 금액</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr
                key={item.id}
                onClick={() => handleStartupClick(item)}
                style={{ cursor: 'pointer' }}
              >
                <td>{item.rank}위</td>
                <td>
                  <div className={styles.name}>
                    <img
                      src={item.startup.image || noImageIcon}
                      alt={item.startup.name}
                    />
                    {item.startup.name}
                  </div>
                </td>
                <td className={styles.description}>
                  {item.startup.description}
                </td>
                <td>{item.startup.categoryName}</td>
                <td>{formatAmount(item.startup.simInvest)} 원</td>
                <td>{formatAmount(item.startup.actualInvest)} 원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
